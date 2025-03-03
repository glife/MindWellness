package com.inn.mind_wellness.dao;

import com.inn.mind_wellness.POJO.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserDao extends JpaRepository<User, Integer> {

    // Find a user by email and password using the named query
    @Query(name = "User.findByEmailAndPassword")
    User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    // Find a user by email
    User findByEmail(String email);  // This method is added to find a user by email

//    @Repository
//    public interface ChatMessageDao extends JpaRepository<ChatMessage, Integer> {
//
//    }

}
