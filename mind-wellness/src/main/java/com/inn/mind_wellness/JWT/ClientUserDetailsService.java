package com.inn.mind_wellness.JWT;

import com.inn.mind_wellness.POJO.User;
import com.inn.mind_wellness.dao.UserDao;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@Slf4j
public class ClientUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao; // To access the database and retrieve user data.

    @Getter
    private User userDetail; // Store user details after loading.

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Loading user by username: {}", username);

        // Find user by email (assuming userDao has a method for this)
        userDetail = userDao.findByEmail(username);

        if (userDetail != null) {
            // Return UserDetails to Spring Security (no roles in your case, hence empty list)
            log.info("User found: {}", userDetail.getEmail());
            return new org.springframework.security.core.userdetails.User(
                    userDetail.getEmail(),
                    userDetail.getPassword(),
                    Collections.emptyList() // No roles/authorities in this case, hence empty list.
            );
        } else {
            log.warn("User not found with email: {}", username);
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
    }
}

