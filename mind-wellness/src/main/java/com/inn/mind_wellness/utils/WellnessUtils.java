package com.inn.mind_wellness.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class WellnessUtils {

    private WellnessUtils(){

    }

    public  static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus){
        return new ResponseEntity<String>("{\"message\":\""+responseMessage+"\"}",httpStatus);
    }
}