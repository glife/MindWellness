package com.inn.mind_wellness.restImpl;

import com.inn.mind_wellness.constants.WellnessConstants;
import com.inn.mind_wellness.rest.UserRest;
import com.inn.mind_wellness.service.UserService;
import com.inn.mind_wellness.utils.WellnessUtils;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@Slf4j
@RestController
@CrossOrigin(origins="*",allowedHeaders = "*")
public class UserRestImpl implements UserRest {

    private static final Logger logger = LoggerFactory.getLogger(UserRestImpl.class);
    @Autowired
    UserService userService;
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try{
            return userService.signUp(requestMap);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return WellnessUtils.getResponseEntity(WellnessConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @Override
    public ResponseEntity<String>  login(@RequestBody(required = true)Map<String, String> requestMap){
        try{
            return userService.login(requestMap);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return WellnessUtils.getResponseEntity(WellnessConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Map<String, String>> getUserD(String token) {
        try {
            // Your logic here
            return userService.getUserD(token);
        } catch (Exception ex) {
            // Replace printStackTrace with proper logging
            logger.error("Error occurred while fetching user details for token: {}", token, ex);

            // Return a generic error response
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
