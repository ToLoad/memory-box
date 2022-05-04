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
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


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
                    .boxId(longToBase64(System.currentTimeMillis() * 10))
                    .boxName(boxCreatePostReq.getBoxName())
                    .boxDescription(boxCreatePostReq.getBoxDescription())
                    .boxOpenAt(boxCreatePostReq.getBoxOpenAt())
                    .boxIsSolo(boxCreatePostReq.isBoxIsSolo())
                    .userSeq(userSeq)
                    .build();
        } else {
            box = Box.builder()
                    .boxId(longToBase64(System.currentTimeMillis() * 10))
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
                        .boxIsDone(box.isBoxIsDone())
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
    public int checkUserInBox(String boxId, Long userSeq) {
        // 0이면 없음, 1이면 포함, 2면 박스 주인
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);
        if (oBoxUser.isPresent()) {
            Optional<Box> oBox = boxRepository.findById(boxId);
            if (oBox.isPresent()) {
                if (Objects.equals(oBox.get().getUserSeq(), userSeq)) return 2;
            }
            return 1;
        }
        else return 0;
    }

    @Override
    public MemoriesBoxDetailBean getMemoriesBoxDetailByBoxId(String boxId) {return boxRepositorySpp.findBoxDetailByBoxId(boxId);}

    @Override
    public boolean boxHide(String boxId, Long userSeq) {
        Optional<BoxUser> oBoxHide = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);

        if(oBoxHide.isPresent()) {
            BoxUser oBoxUser = oBoxHide.get();

            BoxUser boxUser = BoxUser.builder()
                    .boxUserSeq(oBoxUser.getBoxUserSeq())
                    .boxId(oBoxUser.getBoxId())
                    .userSeq(oBoxUser.getUserSeq())
                    .boxUserVoice(oBoxUser.getBoxUserVoice())
                    .boxUserText(oBoxUser.getBoxUserText())
                    .boxUserNickname(oBoxUser.getBoxUserNickname())
                    .boxUserIsDone(oBoxUser.isBoxUserIsDone())
                    .boxUserIsCome(oBoxUser.isBoxUserIsCome())
                    .boxUserIsOpen(oBoxUser.isBoxUserIsOpen())
                    .boxUserIsHide(true) // 숨김
                    .build();

            boxUserRepository.save(boxUser);
            return true;
        }
        return false;
    }

    @Override
    public List<OpenBoxReadyBean> openBoxReadyList(String boxId) {
        List<OpenBoxReadyBean> openBoxReadyList = boxRepositorySpp.findOpenBoxReadyByBoxId(boxId);

        return openBoxReadyList;
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
    public List<CloseBoxReadyBean> closeBoxReadyList(String boxId) {
        List<CloseBoxReadyBean> closeBoxReadyList = boxRepositorySpp.findCloseBoxReadyByBoxId(boxId);

        return closeBoxReadyList;
    }

    @Override
    public Integer closeBoxReadyCount(String boxId) {
        return boxUserRepository.countBoxUserByBoxUserIsDoneTrueAndBoxId(boxId);
    }

    @Override
    public boolean unlockBox(String boxId, Long userSeq) {
        Optional<BoxUser> oBoxUser = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);
        if (oBoxUser.isPresent()) {
            BoxUser boxUser = oBoxUser.get();
            BoxUser nBoxUser = BoxUser.builder()
                    .boxUserSeq(boxUser.getUserSeq())
                    .boxId(boxUser.getBoxId())
                    .userSeq(boxUser.getUserSeq())
                    .boxUserText(boxUser.getBoxUserText())
                    .boxUserVoice(boxUser.getBoxUserVoice())
                    .boxUserNickname(boxUser.getBoxUserNickname())
                    .boxUserIsCome(boxUser.isBoxUserIsCome())
                    .boxUserIsDone(boxUser.isBoxUserIsDone())
                    .boxUserIsHide(boxUser.isBoxUserIsHide())
                    .boxUserIsOpen(true)
                    .build();

            try {
                boxUserRepository.save(nBoxUser);
                return true;
            } catch (Exception e) {
                log.error(e.getMessage());
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean lockBox(String boxId, Long userSeq) {
        Optional<Box> oBox = boxRepository.findById(boxId);
        if (oBox.isPresent()) {
            Box box = oBox.get();
            // 박스 생성자와 동일한 사람이어야함
            if (Objects.equals(box.getUserSeq(), userSeq)) {
                Box nBox = Box.builder()
                        .boxId(box.getBoxId())
                        .userSeq(box.getUserSeq())
                        .boxName(box.getBoxName())
                        .boxDescription(box.getBoxDescription())
                        .boxOpenAt(box.getBoxOpenAt())
                        .boxIsSolo(box.isBoxIsSolo())
                        .boxIsDone(true)
                        .boxLocName(box.getBoxLocName())
                        .boxLocLat(box.getBoxLocLat())
                        .boxLocLng(box.getBoxLocLng())
                        .boxLocAddress(box.getBoxLocAddress())
                        .boxCreatedAt(box.getBoxCreatedAt())
                        .build();

                try {
                    boxRepository.save(nBox);
                    return true;
                } catch (Exception e) {
                    log.error(e.getMessage());
                    return false;
                }
            }
        }
        return false;
    }

    @Override
    public boolean removeBoxUserInBox(Long boxUserSeq, Long userSeq) {
        // 지우려는 기억틀이 존재하는지 확인
        Optional<BoxUser> oBoxUser = boxUserRepository.findById(boxUserSeq);
        if (oBoxUser.isPresent()) {
            // 해당 기억틀이 담긴 기억함의 주인이 삭제를 요청했는지 확인
            Optional<Box> oBox = boxRepository.findById(oBoxUser.get().getBoxId());
            if (oBox.isPresent()) {
                if (Objects.equals(oBox.get().getUserSeq(), userSeq)) {
                    BoxUser boxUser = oBoxUser.get();

                    // S3에서 음성 삭제
                    String key = boxUser.getBoxUserVoice();
                    if (key != null) {
                        key = key.substring(30);
                        amazonS3Client.deleteObject(bucket, key);
                    }

                    // S3에서 사진 및 영상 삭제
                    List<BoxUserFile> boxUserFileList = boxUserFileRepository.findAllByBoxUserSeq(boxUser.getBoxUserSeq());
                    for (BoxUserFile boxUserFile : boxUserFileList) {
                        key = boxUserFile.getFileUrl();
                        if (key != null) {
                            key = key.substring(30);
                            amazonS3Client.deleteObject(bucket, key);
                        }
                    }
                    boxUserRepository.delete(boxUser);
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public List<BoxDetail> boxDetailList(Long userSeq) {
        List<BoxDetail> boxDetailList = new ArrayList<>();

        // **** 열린 함 **** //
        List<BoxDetailVO> openList = boxDetailVOList(boxRepositorySpp.findOpenBoxByUserSeq(userSeq), boxRepositorySpp.findOpenBoxUserByUserSeq(userSeq));
        List<BoxDetailVO> curBox = new ArrayList<>(openList);

        // **** 닫힌 함 **** //
        List<BoxDetailVO> closeList = boxDetailVOList(boxRepositorySpp.findCloseBoxByUserSeq(userSeq), boxRepositorySpp.findCloseBoxUserByUserSeq(userSeq));
        curBox.addAll(closeList);

        // **** 기억함 오픈 대기중인 함 **** //
        List<BoxDetailVO> waitList = boxDetailVOList(boxRepositorySpp.findWaitBoxByUserSeq(userSeq), boxRepositorySpp.findWaitBoxUserByUserSeq(userSeq));
        curBox.addAll(waitList);

        // **** 기억함 담기 준비중인 함 **** //
        List<BoxDetailVO> readyList = boxDetailVOList(boxRepositorySpp.findReadyBoxByUserSeq(userSeq), boxRepositorySpp.findReadyBoxUserByUserSeq(userSeq));
        curBox.addAll(readyList);

        BoxDetail boxDetail = BoxDetail.builder()
                .box(curBox)
                .build();

        boxDetailList.add(boxDetail);

        return boxDetailList;
    }

    @Override
    public List<BoxDetailVO> getHideBoxList(Long userSeq) {
        List<BoxDetailVO> hideBoxList = boxDetailVOList(boxRepositorySpp.findHideBoxByUserSeq(userSeq), boxRepositorySpp.findHideBoxUserByUserSeq(userSeq));

        return hideBoxList;
    }

    @Override
    public boolean boxShow(String boxId, Long userSeq) {
        Optional<BoxUser> oBoxHide = boxUserRepository.findBoxUserByBoxIdAndUserSeq(boxId, userSeq);

        if(oBoxHide.isPresent()) {
            BoxUser oBoxUser = oBoxHide.get();

            BoxUser boxUser = BoxUser.builder()
                    .boxUserSeq(oBoxUser.getBoxUserSeq())
                    .boxId(oBoxUser.getBoxId())
                    .userSeq(oBoxUser.getUserSeq())
                    .boxUserText(oBoxUser.getBoxUserText())
                    .boxUserNickname(oBoxUser.getBoxUserNickname())
                    .boxUserVoice(oBoxUser.getBoxUserVoice())
                    .boxUserIsDone(oBoxUser.isBoxUserIsDone())
                    .boxUserIsCome(oBoxUser.isBoxUserIsCome())
                    .boxUserIsOpen(oBoxUser.isBoxUserIsOpen())
                    .boxUserIsHide(false) // 보이게하기
                    .build();

            boxUserRepository.save(boxUser);
            return true;
        }
        return false;
    }

    private List<BoxDetailVO> boxDetailVOList(List<BoxDetailBean> boxDetailList, List<BoxUserDetailBean> boxUserDetailList) {
        List<BoxDetailVO> boxDetailVOList = new ArrayList<>();

        for (BoxDetailBean boxDetailBean : boxDetailList) {
            List<BoxUserDetailBean> curBoxUser = new ArrayList<>();
            for (BoxUserDetailBean boxUserDetailBean : boxUserDetailList) {
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
                    .boxType(boxDetailBean.getBoxType())
                    .boxUserIsDone(boxDetailBean.isBoxUserIsDone())
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
                'Y', 'Z'
        };
        int shift = 6;
        char[] buf = new char[63];
        int charPos = 62;
        int radix = 1 << shift;
        long mask = radix - 1;
        long number = v;
        do {
            buf[--charPos] = digits[(int) (number & mask)];
            number >>>= shift;
        } while (number != 0);
        return new String(buf, charPos, (62 - charPos));
    }
}
