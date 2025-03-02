package com.inn.mind_wellness.JWT;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; //extracting claims and validating tokens.

    @Autowired
    private  ClientUserDetailsService service;

    Claims claims = null; //To hold the claims extracted from the JWT.
    private  String userName = null; // To store the username extracted from the JWT.
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException { //This method is overridden from OncePerRequestFilter, ensuring that the filter is applied only once per request.
        if (httpServletRequest.getRequestURI().matches("/user/login|/user/signup|/user/details|/chat/set-nickname|/chat/send|/chat/messages")) { // Match the exact URL pattern
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return; // Make sure to return here to prevent further filtering on public endpoints
        }else{
            String authorizationHeader = httpServletRequest.getHeader("Authorization");
            String token = null;

            if(authorizationHeader!=null && authorizationHeader.startsWith("Bearer")){ //If the request is for a protected endpoint,
                token=authorizationHeader.substring(7);//it extracts the token by removing the "Bearer " prefix.
                logger.info("Extracted Token: " + token);
                userName=jwtUtil.extractUsername(token);
                claims = jwtUtil.extractAllClaims(token);
            }
            if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails=service.loadUserByUsername(userName); //It loads user details
                if(jwtUtil.validateToken(token,userDetails)){ //validates the token against the user details.
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
            if (httpServletRequest.getRequestURI().matches("/user/login|/user/signup|/user/details|/chat/set-nickname|/chat/send|/chat/messages")) {
                logger.info("Public endpoint hit: " + httpServletRequest.getRequestURI());
                filterChain.doFilter(httpServletRequest, httpServletResponse);
                return; // Prevent further filtering
            }

        }
    }
//    public boolean isAdmin(){
//        return "admin".equalsIgnoreCase((String) claims.get("role"));
//    }
//    public boolean isUser(){
//        return "user".equalsIgnoreCase((String) claims.get("role"));
//    }
//
//    public String getCurrentUser(){
//        return userName;
//    }
}
