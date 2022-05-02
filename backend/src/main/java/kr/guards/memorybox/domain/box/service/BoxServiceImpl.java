package kr.guards.memorybox.domain.box.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import kr.guards.memorybox.domain.box.db.bean.*;
import kr.guards.memorybox.domain.box.db.entity.Box;
import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.*;
import kr.guards.memorybox.domain.box.request.BoxCreatePostReq;
import kr.guards.memorybox.domain.box.request.BoxModifyPutReq;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;


@Slf4j
@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;
    private final BoxRepositorySpp boxRepositorySpp;
    private final AmazonS3Client amazonS3Client;


    @Autowired
    public BoxServiceImpl(BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository, BoxRepositorySpp boxRepositorySpp, AmazonS3Client amazonS3Client) {
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;
        this.boxRepositorySpp = boxRepositorySpp;
        this.amazonS3Client = amazonS3Client;
    }

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    private final int SUCCESS = 1;
    private final int NONE = 0;
    private final int FAIL = -1;

    @Override
    public String boxCreate(BoxCreatePostReq boxCreatePostReq, Long userSeq) {
        Box box;

        if (boxCreatePostReq.getBoxLocName() == null) {
            box = Box.builder()
                    .boxId(longToBase64(System.currentTimeMillis()))
                    .boxName(boxCreatePostReq.getBoxName())
                    .boxDescription(boxCreatePostReq.getBoxDescription())
                    .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                    .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                    .userSeq(userSeq)
                    .build();
        } else {
            box = Box.builder()
                    .boxId(longToBase64(System.currentTimeMillis()))
                    .boxName(boxCreatePostReq.getBoxName())
                    .boxDescription(boxCreatePostReq.getBoxDescription())
                    .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                    .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                    .userSeq(userSeq)
                    // 박스 장소정보 담기
                    .boxLocName(boxCreatePostReq.getBoxLocName())
                    .boxLocLat(boxCreatePostReq.getBoxLocLat())
                    .boxLocLng(boxCreatePostReq.getBoxLocLng())
                    .boxLocAddress(boxCreatePostReq.getBoxLocAddress())
                    .build();
        }

        try {
            boxRepository.save(box);
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
        return box.getBoxId();
    }

    @Override
    public boolean boxModify(BoxModifyPutReq boxModifyPutReq, String boxId, Long userSeq) {
        Optional<Box> oBox = boxRepository.findById(boxId);
        if (oBox.isPresent()) {
            Box box = oBox.get();

            // 수정하려는 기억함의 주인이 현재 API를 호출한 유저와 동일한지 확인
            if (Objects.equals(box.getUserSeq(), userSeq)) {
                String nBoxName = boxModifyPutReq.getBoxName() == null ? box.getBoxName() : boxModifyPutReq.getBoxName();
                String nBoxDesc = boxModifyPutReq.getBoxDescription() == null ? box.getBoxDescription() : boxModifyPutReq.getBoxDescription();

                Box nBox = Box.builder()
                        .boxId(box.getBoxId())
                        .userSeq(box.getUserSeq())
                        .boxName(nBoxName)
                        .boxDescription(nBoxDesc)
                        .boxOpenAt(box.getBoxOpenAt())
                        .boxIsSolo(box.isBoxIsSolo())
                        .boxIsOpen(box.isBoxIsOpen())
                        .boxLocName(box.getBoxLocName())
                        .boxLocLat(box.getBoxLocLat())
                        .boxLocLng(box.getBoxLocLng())
                        .boxLocAddress(box.getBoxLocAddress())
                        .boxCreatedAt(box.getBoxCreatedAt())
                        .build();

                boxRepository.save(nBox);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean boxRemove(String boxId, Long userSeq) {
        Optional<Box> oBox = boxRepository.findById(boxId);
        if (oBox.isPresent()) {
            Box box = oBox.get();

            // 삭제하려는 기억함의 주인이 현재 API를 호출한 유저와 동일한지 확인
            if (Objects.equals(box.getUserSeq(), userSeq)) {
                // 삭제시에 저장된 파일도 제거하기
                // 1. S3에서 기억함 번호에 해당되는 폴더 삭제
                for (S3ObjectSummary file : amazonS3Client.listObjects(bucket, boxId + "/").getObjectSummaries()) {
                    amazonS3Client.deleteObject(bucket, file.getKey());
                }

                // 2. DB에서 기억함 제거(기억틀과 기억들은 Join으로 엮여있어서 같이 지워짐)
                boxRepository.delete(box);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<MemoriesVO> getAllMemories(String boxId, Long userSeq) {
        boolean isUser = false;
        List<MemoriesVO> memories = new ArrayList<>();

        // 해당하는 박스의 유저들 불러오기
        List<BoxUserMemoryBean> userList = boxRepositorySpp.findBoxUserDetailByBoxId(boxId);
        for (BoxUserMemoryBean boxUserMemoryBean : userList) {
            // 해당 유저가 이 기억함에 포함된 유저인지 확인
            if (Objects.equals(boxUserMemoryBean.getUserSeq(), userSeq)) isUser = true;

            List<BoxUserFile> files = boxUserFileRepository.findAllByBoxUserSeq(boxUserMemoryBean.getBoxUserSeq());
            List<String> image = new ArrayList<>();
            List<String> video = new ArrayList<>();
            for (BoxUserFile file : files) {
                if (file.getFileType().charAt(0) == 'i') {
                    image.add(file.getFileUrl());
                } else video.add(file.getFileUrl());
            }

            MemoriesVO memory = MemoriesVO.builder()
                    .userSeq(boxUserMemoryBean.getUserSeq())
                    .userEmail(boxUserMemoryBean.getUserEmail())
                    .userBoxNickname(boxUserMemoryBean.getUserBoxNickname())
                    .userProfileImage(boxUserMemoryBean.getUserProfileImage())
                    .text(boxUserMemoryBean.getText())
                    .voice(boxUserMemoryBean.getVoice())
                    .image(image)
                    .video(video)
                    .build();
            memories.add(memory);
        }
        if (isUser) return memories;
        else return null;
    }

    @Override
    public boolean checkUserInBox(String boxId, Long userSeq) {
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);
        if (oBoxUser.isPresent()) return true;
        else return false;
    }

    @Override
    public BoxDetailBean getBoxDetailByBoxId(String boxId) {return boxRepositorySpp.findBoxDetailByBoxId(boxId);}

    @Override
    public int openBoxHide(String boxId, Long userSeq) {
        Optional<BoxUser> oBoxHide = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);

        if(oBoxHide.isPresent()) {
            BoxUser oBoxUser = oBoxHide.get();

            if(oBoxUser.getBox().isBoxIsOpen()) {
                BoxUser boxUser = BoxUser.builder()
                        .boxUserSeq(oBoxUser.getBoxUserSeq())
                        .boxId(oBoxUser.getBoxId())
                        .userSeq(oBoxUser.getUserSeq())
                        .boxUserText(oBoxUser.getBoxUserText())
                        .boxUserNickname(oBoxUser.getBoxUserNickname())
                        .boxUserIsDone(oBoxUser.isBoxUserIsDone())
                        .boxUserIsCome(oBoxUser.isBoxUserIsCome())
                        .boxUserIsHide(true) // 숨김
                        .build();

                boxUserRepository.save(boxUser);
                return SUCCESS;
            } else return NONE;
        }
        return FAIL;
    }

    @Override
    public List<OpenBoxReadyBean> openBoxReadyList(String boxId) {
        List<OpenBoxReadyBean> openBoxReadyList = boxRepositorySpp.findOpenBoxReadyByBoxId(boxId);

        return openBoxReadyList != null ? openBoxReadyList : Collections.emptyList();
    }

    @Override
    public Integer openBoxReadyCount(String boxId) {
        return boxUserRepository.countBoxUserByBoxUserIsComeTrueAndBoxId(boxId);
    }

    @Override
    public boolean openBoxReadyCheck(String boxId, Long userSeq) {
        Optional<BoxUser> oBoxReadyUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);

        if(oBoxReadyUser.isPresent()) {

            BoxUser oBoxUser = oBoxReadyUser.get();

            BoxUser boxUser = BoxUser.builder()
                    .boxUserSeq(oBoxUser.getBoxUserSeq())
                    .boxId(oBoxUser.getBoxId())
                    .userSeq(oBoxUser.getUserSeq())
                    .boxUserText(oBoxUser.getBoxUserText())
                    .boxUserNickname(oBoxUser.getBoxUserNickname())
                    .boxUserIsDone(oBoxUser.isBoxUserIsDone())
                    .boxUserIsHide(oBoxUser.isBoxUserIsHide())
                    .boxUserIsCome(true)
                    .build();

            boxUserRepository.save(boxUser);
            return true;
        }
        return false;
    }

    @Override
    public boolean openBoxActivation(String boxId) {
        double openReadyCount = 0;

        if(boxUserRepository.countBoxUserByBoxId(boxId) != 0 && boxUserRepository.countBoxUserByBoxUserIsComeTrueAndBoxId(boxId) != 0) {
            openReadyCount = ((double) (100 / boxUserRepository.countBoxUserByBoxId(boxId))) * boxUserRepository.countBoxUserByBoxUserIsComeTrueAndBoxId(boxId);

            if(openReadyCount >= 60) return true;
            else return false;
        }return false;
    }

    @Override
    public List<BoxDetailVO> boxOpenDetailList(Long userSeq) {
        List<BoxDetailBean> boxDetailList = boxRepositorySpp.findOpenBoxByUserSeq(userSeq);
        List<BoxUserDetailBean> boxUserDetail = boxRepositorySpp.findOpenBoxUserByUserSeq(userSeq);

        List<BoxDetailVO> boxDetailVOList = new ArrayList<>();

        for (BoxDetailBean boxDetailBean : boxDetailList) {
            List<BoxUserDetailBean> curBoxUser = new ArrayList<>();
            for (BoxUserDetailBean boxUserDetailBean : boxUserDetail) {
                if (Objects.equals(boxUserDetailBean.getBoxId(), boxDetailBean.getBoxId()))
                    curBoxUser.add(boxUserDetailBean);
            }

            BoxDetailVO boxDetailVO = BoxDetailVO.builder()
                    .boxId(boxDetailBean.getBoxId())
                    .boxName(boxDetailBean.getBoxName())
                    .boxDescription(boxDetailBean.getBoxDescription())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxOpenAt(boxDetailBean.getBoxOpenAt())
                    .boxLocName(boxDetailBean.getBoxLocName())
                    .boxLocLat(boxDetailBean.getBoxLocLat())
                    .boxLocLng(boxDetailBean.getBoxLocLng())
                    .boxLocAddress(boxDetailBean.getBoxLocAddress())
                    .user(curBoxUser)
                    .build();

            boxDetailVOList.add(boxDetailVO);
        }
        return boxDetailVOList;
    }

    @Override
    public List<BoxDetailVO> boxCloseDetailList(Long userSeq) {
        List<BoxDetailBean> boxDetailList = boxRepositorySpp.findCloseBoxByUserSeq(userSeq);
        List<BoxUserDetailBean> boxUserDetail = boxRepositorySpp.findCloseBoxUserByUserSeq(userSeq);

        List<BoxDetailVO> boxDetailVOList = new ArrayList<>();

        for (BoxDetailBean boxDetailBean : boxDetailList) {
            List<BoxUserDetailBean> curBoxUser = new ArrayList<>();
            for (BoxUserDetailBean boxUserDetailBean : boxUserDetail) {
                if (Objects.equals(boxUserDetailBean.getBoxId(), boxDetailBean.getBoxId()))
                    curBoxUser.add(boxUserDetailBean);
            }

            BoxDetailVO boxDetailVO = BoxDetailVO.builder()
                    .boxId(boxDetailBean.getBoxId())
                    .boxName(boxDetailBean.getBoxName())
                    .boxDescription(boxDetailBean.getBoxDescription())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxOpenAt(boxDetailBean.getBoxOpenAt())
                    .boxLocName(boxDetailBean.getBoxLocName())
                    .boxLocLat(boxDetailBean.getBoxLocLat())
                    .boxLocLng(boxDetailBean.getBoxLocLng())
                    .boxLocAddress(boxDetailBean.getBoxLocAddress())
                    .user(curBoxUser)
                    .build();

            boxDetailVOList.add(boxDetailVO);
        }
        return boxDetailVOList;
    }

    @Override
    public List<BoxDetailVO> boxReadyDetailList(Long userSeq) {
        List<BoxDetailBean> boxDetailList = boxRepositorySpp.findReadyBoxByUserSeq(userSeq);
        List<BoxUserDetailBean> boxUserDetail = boxRepositorySpp.findReadyBoxUserByUserSeq(userSeq);

        List<BoxDetailVO> boxDetailVOList = new ArrayList<>();

        for (BoxDetailBean boxDetailBean : boxDetailList) {
            List<BoxUserDetailBean> curBoxUser = new ArrayList<>();
            for (BoxUserDetailBean boxUserDetailBean : boxUserDetail) {
                if (Objects.equals(boxUserDetailBean.getBoxId(), boxDetailBean.getBoxId()))
                    curBoxUser.add(boxUserDetailBean);
            }

            BoxDetailVO boxDetailVO = BoxDetailVO.builder()
                    .boxId(boxDetailBean.getBoxId())
                    .boxName(boxDetailBean.getBoxName())
                    .boxDescription(boxDetailBean.getBoxDescription())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxOpenAt(boxDetailBean.getBoxOpenAt())
                    .boxLocName(boxDetailBean.getBoxLocName())
                    .boxLocLat(boxDetailBean.getBoxLocLat())
                    .boxLocLng(boxDetailBean.getBoxLocLng())
                    .boxLocAddress(boxDetailBean.getBoxLocAddress())
                    .user(curBoxUser)
                    .build();

            boxDetailVOList.add(boxDetailVO);
        }
        return boxDetailVOList;
    }

    @Override
    public List<BoxDetailVO> boxAllDetailList(Long userSeq) {
        List<BoxDetailBean> boxDetailList = boxRepositorySpp.findAllBoxByUserSeq(userSeq);
        List<BoxUserDetailBean> boxUserDetail = boxRepositorySpp.findAllBoxUserByUserSeq(userSeq);

        List<BoxDetailVO> boxDetailVOList = new ArrayList<>();

        for (BoxDetailBean boxDetailBean : boxDetailList) {
            List<BoxUserDetailBean> curBoxUser = new ArrayList<>();
            for (BoxUserDetailBean boxUserDetailBean : boxUserDetail) {
                if (Objects.equals(boxUserDetailBean.getBoxId(), boxDetailBean.getBoxId()))
                    curBoxUser.add(boxUserDetailBean);
            }

            BoxDetailVO boxDetailVO = BoxDetailVO.builder()
                    .boxId(boxDetailBean.getBoxId())
                    .boxName(boxDetailBean.getBoxName())
                    .boxDescription(boxDetailBean.getBoxDescription())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxCreatedAt(boxDetailBean.getBoxCreatedAt())
                    .boxOpenAt(boxDetailBean.getBoxOpenAt())
                    .boxLocName(boxDetailBean.getBoxLocName())
                    .boxLocLat(boxDetailBean.getBoxLocLat())
                    .boxLocLng(boxDetailBean.getBoxLocLng())
                    .boxLocAddress(boxDetailBean.getBoxLocAddress())
                    .user(curBoxUser)
                    .build();

            boxDetailVOList.add(boxDetailVO);
        }
        return boxDetailVOList;
    }

    private String longToBase64(long v) {
        final char[] digits = {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D',
                'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z', '#', '$'
        };
        int shift = 6;
        char[] buf = new char[64];
        int charPos = 64;
        int radix = 1 << shift;
        long mask = radix - 1;
        long number = v;
        do {
            buf[--charPos] = digits[(int) (number & mask)];
            number >>>= shift;
        } while (number != 0);
        return new String(buf, charPos, (64 - charPos));
    }
}
