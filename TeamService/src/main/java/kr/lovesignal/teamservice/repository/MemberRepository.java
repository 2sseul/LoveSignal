package kr.lovesignal.teamservice.repository;


import kr.lovesignal.teamservice.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByLoginIdAndExpiredLike(String loginId, String expired);

    Optional<MemberEntity> findByUUIDAndExpiredLike(UUID UUID, String expired);

    MemberEntity findByNicknameAndExpiredLike(String nickname, String expired);
}
