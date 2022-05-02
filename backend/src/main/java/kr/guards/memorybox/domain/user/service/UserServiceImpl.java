package kr.guards.memorybox.domain.user.service;

import kr.guards.memorybox.domain.box.db.entity.BoxUser;
import kr.guards.memorybox.domain.box.db.entity.BoxUserFile;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserFileRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import kr.guards.memorybox.domain.user.db.entity.User;
import kr.guards.memorybox.domain.user.db.entity.UserProfileImg;
import kr.guards.memorybox.domain.user.db.repository.UserProfileImgRepository;
import kr.guards.memorybox.domain.user.db.repository.UserRepository;
import kr.guards.memorybox.domain.user.db.repository.UserRepositorySupport;
import kr.guards.memorybox.domain.user.response.UserMypageGetRes;
import kr.guards.memorybox.global.auth.KakaoOAuth2;
import kr.guards.memorybox.global.auth.KakaoUser;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Value("${app.file.main.path}")
    private String filePath;

    @Value("${app.file.profile.dir}")
    private String profileDir;

    @Value("${app.baseurl}")
    private String baseUrl;

    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;
    private final UserProfileImgRepository userProfileImgRepository;
    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxUserFileRepository boxUserFileRepository;

    private final KakaoOAuth2 kakaoOAuth2;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserRepositorySupport userRepositorySupport, UserProfileImgRepository userProfileImgRepository,
                           BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxUserFileRepository boxUserFileRepository,
                           KakaoOAuth2 kakaoOAuth2) {
        this.userRepository = userRepository;
        this.userRepositorySupport = userRepositorySupport;
        this.userProfileImgRepository = userProfileImgRepository;
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxUserFileRepository = boxUserFileRepository;
        this.kakaoOAuth2 = kakaoOAuth2;
    }

    @Override
    public String userLogin(String authorizedCode) {
        // 인가 코드로 accessToken 발급
        String accessToken = kakaoOAuth2.getAccessToken(authorizedCode);
        log.info("accessToken : " + accessToken);
        if (accessToken != null) {
            // accessToken에서 사용자 정보 가져오기
            KakaoUser kakaoUserInfo = kakaoOAuth2.getUserInfoByToken(accessToken);

            Long kakaoId = kakaoUserInfo.getUserKakaoId();
            String nickname = kakaoUserInfo.getUserNickname();

            // db에 Kakao Id가 있는지 확인
            User kakaoUser = userRepository.findByUserKakaoId(kakaoId);
            // 없다면 카카오 정보로 회원가입
            if (kakaoUser == null) {
                User newUser = User.builder()
                        .userKakaoId(kakaoId)
                        .userEmail(kakaoUserInfo.getUserEmail())
                        .userNickname(nickname)
                        .userProfileImage(kakaoUserInfo.getUserProfileImage() == null ? "https://storage.memory-box.kr/profile/default.jpg" : kakaoUser.getUserProfileImage())
                        .userRole("ROLE_USER")
                        .userBoxRemain(5)
                        .build();
                userRepository.save(newUser);
            }
            return accessToken;
        }
        return null;
    }

    @Override
    public User getUserInfoByToken(String accessToken){
        // accessToken에서 사용자 정보 가져오기
        KakaoUser kakaoUserInfo = kakaoOAuth2.getUserInfoByToken(accessToken);

        if (kakaoUserInfo != null) {
            // kakao id로 db에서 정보 가져오기
            User user = userRepository.findByUserKakaoId(kakaoUserInfo.getUserKakaoId());

            return user;
        }
        return null;
    }

    /** 마이페이지 **/

    @Override
    public UserMypageGetRes getUserMypage(Long userSeq) {
        Optional<User> findUser = userRepository.findById(userSeq);
        if (findUser.isPresent() == false) { // 유저 정보 없는 경우
            return null;
        }
        User user = findUser.get();
        UserMypageGetRes userMypageInfo = new UserMypageGetRes();

        userMypageInfo.setUserSeq(user.getUserSeq());
        userMypageInfo.setUserKakaoId(user.getUserKakaoId());
        userMypageInfo.setUserEmail(user.getUserEmail());
        userMypageInfo.setUserNickname(user.getUserNickname());
        userMypageInfo.setUserBoxRemain(user.getUserBoxRemain());
        userMypageInfo.setUserProfileImage(user.getUserProfileImage());

        return userMypageInfo;
    }

    @Override
    public Boolean modifyUserProfileImg(Long userSeq, MultipartHttpServletRequest multipartFile) {
        MultipartFile image = multipartFile.getFile("profile");
        File uploadDir = new File(filePath + File.separator + profileDir);

        // 1. 기존 프로필 이미지 삭제하고 새 프로필 이미지 저장
        Long imgSeq = saveFile(image, uploadDir, userSeq);
        if (imgSeq != null){
            // 2. 서버에서 유저 이미지 가져오기
            String imgUrl = baseUrl + "/api/media/profile/" + imgSeq;
            // 3. 이미지 경로 User 테이블에 저장하기
            Long isComplete = userRepositorySupport.modifyUserProfileImgUrl(userSeq, imgUrl);
            if (isComplete == 0L) {
                log.error("modifyUserProfileImg - User 테이블의 프로필 이미지 경로 변경 실패");
                return false;
            }
            return true;
        }
        log.error("modifyUserProfileImg - 프로필 이미지 저장 실패");
        return false;
    }

    @Override
    public Boolean deleteUser(Long userSeq, HttpServletRequest request) {
        // 1. DB에서 삭제
        // 1-1. 유저가 만든 기억틀 삭제
            // 삭제시에 저장된 파일도 제거하기
            // 1) 유저 식별 번호로 조회되는 모든 기억틀 불러오기
        List<BoxUser> boxUserByUserSeq = boxUserRepository.findBoxUserByUserSeq(userSeq);

            // 2) 해당 기억틀의 기억들 파일 하나씩 제거
        for (BoxUser boxUser : boxUserByUserSeq) {
            List<BoxUserFile> boxUserFiles = boxUserFileRepository.findAllByBoxUserSeq(boxUser.getBoxUserSeq());
            for (BoxUserFile boxUserFile : boxUserFiles) {
                String fileUrl = boxUserFile.getFileUrl();
                File file = new File(filePath + File.separator, fileUrl);

                if (file.exists()) file.delete();
            }
            // 3) 기억틀 제거
            boxUserRepository.delete(boxUser);
        }

        // 1-2. 유저가 생성한 기억함 전부 제거
        boxRepository.deleteAllByUserSeq(userSeq);

        // 1-3. 유저 프로필 이미지 파일 제거
        deleteUserProfileImg(userSeq);

        // 1-4. 유저 정보 제거
        Optional<User> findUser = userRepository.findById(userSeq);
        if (findUser.isPresent() == false) { // 유저 정보 없는 경우
            log.error("deleteUser - DB에 해당 유저가 없습니다.");
            return false;
        }
        userRepository.deleteById(userSeq);

        // 2. 카카오 연결 끊기
        // security에서 이전에 토큰을 검사해주기 때문에 여기까지 들어왔다면 토큰이 잘못될 일 없음
        kakaoOAuth2.unlinkUser(request);
        return true;
    }

    private Long saveFile(MultipartFile file, File uploadDir, Long userSeq) {
        try {
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String fileName = file.getOriginalFilename();
            UUID uuid = UUID.randomUUID();
            String extension = FilenameUtils.getExtension(fileName);
            String savingFileName = uuid + "." + extension;

            File destFile = null;
            String fileUrl = null;

            destFile = new File(filePath + File.separator, profileDir + File.separator + savingFileName);
            fileUrl = "/" + profileDir + "/" + savingFileName;
            log.warn("DestFile : " + destFile.getPath());
            file.transferTo(destFile);

            // 기존 프로필 이미지 삭제
            deleteUserProfileImg(userSeq);

            // 새 프로필 이미지 저장
            UserProfileImg newProfileImg = UserProfileImg.builder()
                    .userSeq(userSeq)
                    .imgContentType(file.getContentType())
                    .imgUrl(fileUrl)
                    .build();

            UserProfileImg saveUserProfileImg = userProfileImgRepository.save(newProfileImg);
            return saveUserProfileImg.getImgSeq();
        } catch (Exception e) {
            log.error(e.getMessage());
            return null;
        }
    }

    private Boolean deleteUserProfileImg(Long userSeq) {
        UserProfileImg originProfileImg = userProfileImgRepository.findByUserSeq(userSeq);
        if (originProfileImg != null) {
            // 파일 삭제
            String originImgUrl = originProfileImg.getImgUrl();
            File originImgFile = new File(filePath + File.separator, originImgUrl);
            if (originImgFile.exists()) originImgFile.delete();

            // 데이터 삭제
            userProfileImgRepository.delete(originProfileImg);
        }
        return true;
    }
}
