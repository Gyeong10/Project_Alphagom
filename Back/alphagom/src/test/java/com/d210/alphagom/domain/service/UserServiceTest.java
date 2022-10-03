//package com.d210.alphagom.domain.service;
//
//import com.d210.alphagom.domain.entity.Role;
//import com.d210.alphagom.domain.entity.User;
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
//@Transactional
//@SpringBootTest
//public class UserServiceTest {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private UserService userService;
//
//    @PersistenceContext
//    EntityManager em;
//
//    @Test
//    void findUserTest() {
//        // given
//        User user = new User("김성준", "ssafy123@ssafy.com", "testpicture", Role.USER);
//        userRepository.save(user);
//        em.persist(user);
//
//        Long userId = user.getId();
//
//        // when
//        User testUser = userService.findUser(userId);
//        String name = testUser.getName();
//
//        // then
//        Assertions.assertEquals(user.getName(), name);
//    }
//
//    @Test
//    void saveNicknameTest() {
//        // given
//        User user = new User("김성준", "ssafy123@ssafy.com", "testpicture", Role.USER);
//        userRepository.save(user);
//        em.persist(user);
//
//        // when
//        User testUser = userService.findUser(user.getId());
//        userService.saveNickname(testUser.getId(), "testNickname");
//
//        // then
//        Assertions.assertEquals("testNickname", testUser.getNickname());
//    }
//
//
//    @Test
//    void findUserNickNameTest() {
//        // given
//        User user = new User("김성준", "ssafy123@ssafy.com", "testpicture", Role.USER);
//        userRepository.save(user);
//        em.persist(user);
//
//        // when
//        User testUser = userService.findUser(user.getId());
//        testUser.setNickname("testNickname");
//
//        String userNickName = userService.findUserNickName(user.getId());
//
//        // then
//        Assertions.assertEquals(testUser.getNickname(), userNickName);
//    }
//
//    @Test
//    void checkIsCastleTest() {
//        // given
//        User user = new User("김성준", "ssafy123@ssafy.com", "testpicture", Role.USER);
//        userRepository.save(user);
//        em.persist(user);
//
//        // when
//        User testUser = userService.findUser(user.getId());
//        userService.checkIsCastle(testUser.getId());
//
//        // then
//        Assertions.assertEquals(true, testUser.isCastle());
//    }
//}
