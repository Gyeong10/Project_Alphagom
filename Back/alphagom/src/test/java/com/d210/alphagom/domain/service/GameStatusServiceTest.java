//package com.d210.alphagom.domain.service;
//
//import com.d210.alphagom.domain.entity.GameStatus;
//import com.d210.alphagom.domain.entity.GameTag;
//import com.d210.alphagom.domain.entity.Role;
//import com.d210.alphagom.domain.entity.User;
//import com.d210.alphagom.domain.repository.GameStatusRepository;
//import com.d210.alphagom.domain.repository.UserRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//
//import java.time.LocalDate;
//import java.util.Optional;
//
//@Transactional
//@SpringBootTest
//class GameStatusServiceTest {
//
//    @Autowired
//    private GameStatusRepository gameStatusRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private GameStatusService gameStatusService;
//
//    @Autowired
//    private UserService userService;
//
//    @PersistenceContext
//    EntityManager em;
//
//    @Test
//    void saveScoreTest() {
//        // given
//        User user = new User("김성준", "test123@ssafy.com", "개미", Role.USER);
//        userRepository.save(user);
//        em.persist(user);
//
//        GameTag tag = GameTag.sky;
//
//        // when
//        Long gameStatusId = gameStatusService.saveScore(100, tag, user);
//
//        Optional<GameStatus> gameStatus = gameStatusRepository.findById(gameStatusId);
//        int score = gameStatus.get().getStatus();
//
//        // then
//        Assertions.assertEquals(100, score);
//
//    }
//}