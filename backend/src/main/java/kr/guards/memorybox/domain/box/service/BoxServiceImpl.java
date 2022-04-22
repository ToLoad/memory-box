package kr.guards.memorybox.domain.box.service;

import kr.guards.memorybox.domain.box.db.bean.BoxDetailList;
import kr.guards.memorybox.domain.box.db.bean.BoxUserDetailList;
import kr.guards.memorybox.domain.box.db.repository.BoxRepository;
import kr.guards.memorybox.domain.box.db.repository.BoxRepositorySpp;
import kr.guards.memorybox.domain.box.db.repository.BoxUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BoxServiceImpl implements BoxService {

    private final BoxRepository boxRepository;
    private final BoxUserRepository boxUserRepository;
    private final BoxRepositorySpp boxRepositorySpp;

    public BoxServiceImpl(BoxRepository boxRepository, BoxUserRepository boxUserRepository, BoxRepositorySpp boxRepositorySpp) {
        this.boxRepository = boxRepository;
        this.boxUserRepository = boxUserRepository;
        this.boxRepositorySpp = boxRepositorySpp;
    }


    @Override
    public List<BoxDetailList> boxOpenListByUserSeq(Long userSeq) {return boxRepositorySpp.findOpenBoxByUserSeq(userSeq);}

    @Override
    public List<BoxDetailList> boxCloseListByUserSeq(Long userSeq) {return boxRepositorySpp.findCloseBoxByUserSeq(userSeq);}

    @Override
    public List<BoxUserDetailList> boxOpenUserListByuserSeq(Long userSeq) {
        List<Long> oBoxUser = boxRepositorySpp.findOpenBoxUserByUserSeq(userSeq);

        if(!oBoxUser.isEmpty() && oBoxUser != null) {
            for (int i = 0; i < oBoxUser.size(); i++) {
                return boxRepositorySpp.findAllBoxUserByBoxSeq(oBoxUser.get(i));
            }
        }
        return null;
    }

    @Override
    public List<BoxUserDetailList> boxCloseUserListByuserSeq(Long userSeq) {
        List<Long> cBoxUser = boxRepositorySpp.findCloseBoxUserByUserSeq(userSeq);

        if(!cBoxUser.isEmpty() && cBoxUser != null) {
            for (int i = 0; i < cBoxUser.size(); i++) {
                return boxRepositorySpp.findAllBoxUserByBoxSeq(cBoxUser.get(i));
            }
        }
        return null;
    }
}
