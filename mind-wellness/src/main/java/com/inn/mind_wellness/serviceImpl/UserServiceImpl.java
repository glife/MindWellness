package com.inn.mind_wellness.serviceImpl;

import com.inn.mind_wellness.JWT.JwtUtil;
import com.inn.mind_wellness.POJO.User;
import com.inn.mind_wellness.dao.UserDao;
import com.inn.mind_wellness.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.AuthProvider;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (validateSignUpMap(requestMap)) {
                String email = requestMap.get("email");

                User user = userDao.findByEmail(email);
                if (Objects.isNull(user)) {
                    user = getUserFromMap(requestMap);
                    userDao.save(user);
                    return new ResponseEntity<>("{\"message\":\"Successfully Registered!\"}", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("{\"message\":\"Email already exists.\"}", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("{\"message\":\"Invalid data provided.\"}", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            log.error("Error during signup: {}", ex.getMessage());
        }
        return new ResponseEntity<>("{\"message\":\"Something went wrong.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private boolean validateSignUpMap(Map<String, String> requestMap) {  // Validates required fields for sign-up
        return requestMap.containsKey("email") && requestMap.containsKey("password")
                && requestMap.containsKey("name") && requestMap.containsKey("age")
                && requestMap.containsKey("gender") && requestMap.containsKey("contactNo");
    }

    private User getUserFromMap(Map<String, String> requestMap) {  // Converts request map into User object
        User user = new User();
        user.setEmail(requestMap.get("email"));
        user.setPassword(passwordEncoder.encode(requestMap.get("password")));
        user.setName(requestMap.get("name"));
        user.setAge(Integer.parseInt(requestMap.get("age")));  // Assuming age is passed as a string
        user.setGender(requestMap.get("gender"));
        user.setContactNo(requestMap.get("contactNo"));
        return user;
    }
    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside Login");
        try {
            String email = requestMap.get("email");
            String password = requestMap.get("password");

            User user = userDao.findByEmail(email);

            if (user != null && passwordEncoder.matches(password, user.getPassword())) {
                log.info("Authentication successful for user: {}", email);
                String token = jwtUtil.generateToken(email);
                return new ResponseEntity<>("{\"token\":\"" + token + "\"}", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("{\"message\":\"Invalid email or password.\"}", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception ex) {
            log.error("Error during login: {}", ex.getMessage());
            return new ResponseEntity<>("{\"message\":\"Server error. Please try again later.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<Map<String, String>> getUserD(String token) {
        try {
            // Extract email from the token (using JWT utils or whatever method you're using)
            String email = jwtUtil.extractUsername(token); // Extract email from JWT token

            // Find user by email and role CLIENT
            User user = userDao.findByEmail(email);

            // If user exists and has an associated client
            if (user != null) {
                Map<String, String> userDetails = new HashMap<>();
                userDetails.put("userID", user.getUserID().toString());
                userDetails.put("name", user.getName());
                userDetails.put("email", user.getEmail());
                userDetails.put("contactNo", user.getContactNo());
                userDetails.put("age", user.getAge().toString());
                userDetails.put("gender", user.getGender());

                // Return the user details wrapped in ResponseEntity
                return new ResponseEntity<>(userDetails, HttpStatus.OK);
            } else {
                // Return 404 if client is not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            // Handle any unexpected errors and return a 500 Internal Server Error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
        import React, { Component } from "react";
        import Signup from "./components/Signup"; // If inside src/components/
        import Dashboard from "./components/Dashboard";


function App() {
    return (
            <
  );
}

export default App;

