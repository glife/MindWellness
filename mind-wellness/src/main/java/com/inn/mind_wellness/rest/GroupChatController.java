package com.inn.mind_wellness.rest;

import com.inn.mind_wellness.JWT.ClientUserDetailsService;
import com.inn.mind_wellness.JWT.JwtUtil;
import com.inn.mind_wellness.POJO.ChatMessage;
import com.inn.mind_wellness.POJO.PeerSupportGroup;
import com.inn.mind_wellness.POJO.User;
import com.inn.mind_wellness.POJO.UserNickname;
import com.inn.mind_wellness.dao.ChatMessageDao;
import com.inn.mind_wellness.dao.PeerSupportGroupDao;
import com.inn.mind_wellness.dao.UserDao;
import com.inn.mind_wellness.dao.UserNicknameDao;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@Service
@CrossOrigin(origins="*",allowedHeaders = "*")
@RequestMapping("/chat")
public class GroupChatController {

    @Autowired
    private ChatMessageDao chatMessageDao;

    @Autowired
    private UserNicknameDao userNicknameDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PeerSupportGroupDao peerSupportGroupDao;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final Logger logger = LoggerFactory.getLogger(GroupChatController.class);


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ClientUserDetailsService userDetailsService;

    private static final Long GROUP_ID = 1L; // Default Peer Group ID

    // 🔹 Helper method to extract authenticated username from JWT
    private String getAuthenticatedUsername(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return jwtUtil.extractUsername(authHeader.substring(7));
    }

    // 🔹 Ensure Peer Support Group Exists
    private PeerSupportGroup getOrCreatePeerGroup() {
        return peerSupportGroupDao.findById(GROUP_ID)
                .orElseGet(() -> {
                    PeerSupportGroup newGroup = new PeerSupportGroup();
                    newGroup.setGroupId(GROUP_ID);
                    newGroup.setGroupName("Default Peer Support Group");
                    return peerSupportGroupDao.save(newGroup);
                });
    }

    // 🔹 Set Nickname for the Authenticated User
    @Transactional
    @PostMapping("/set-nickname")
    public ResponseEntity<String> setNickname(@RequestBody UserNickname userNickname, HttpServletRequest request) {
        String username = getAuthenticatedUsername(request);
        if (username == null) {
            logger.error("❌ Unauthorized request: No token provided.");
            return ResponseEntity.status(403).body("Unauthorized: Token required.");
        }

        User user = userDao.findByEmail(username);
        if (user == null) {
            logger.error("❌ User not found: {}", username);
            return ResponseEntity.badRequest().body("User not found.");
        }

        logger.info("✅ User found: {} (ID: {})", user.getEmail(), user.getUserID());

        // Check if nickname is unique
        if (user.getName().equals(userNickname.getNickname()) || userNicknameDao.existsByNickname(userNickname.getNickname())) {
            logger.warn("⚠️ Nickname '{}' is already taken or matches the user's real name.", userNickname.getNickname());
            return ResponseEntity.badRequest().body("Nickname must be unique and not match your real name.");
        }

        UserNickname existingNickname = userNicknameDao.findByUser(user);
        if (existingNickname != null) {
            logger.info("🗑️ Deleting existing nickname: {}", existingNickname.getNickname());
            userNicknameDao.delete(existingNickname);
        }

        // Save new nickname
        userNickname.setUser(user);
        userNicknameDao.save(userNickname);
        userNicknameDao.flush(); // Ensure immediate commit

        logger.info("✅ Nickname '{}' saved successfully for user {}", userNickname.getNickname(), user.getEmail());

        return ResponseEntity.ok("Nickname set successfully!");
    }


    // 🔹 Send Message with Authenticated User and Nickname

    @Transactional
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ChatMessage chatMessage, HttpServletRequest request) {
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.info("Received request to send message.");

        String username = getAuthenticatedUsername(request);
        if (username == null) {
            logger.warn("Unauthorized request: Token is missing.");
            return ResponseEntity.status(403).body("Unauthorized: Token required.");
        }

        logger.info("Authenticated username: {}", username);
        User user = userDao.findByEmail(username);
        if (user == null) {
            logger.error("User not found in database: {}", username);
            return ResponseEntity.badRequest().body("User not found.");
        }

        logger.info("User found: {}", user.getEmail());

        // Fetch User's Nickname
        UserNickname userNicknameOptional = userNicknameDao.findByUser(user);
        if (userNicknameOptional == null) {
            logger.warn("User {} has not set a nickname.", user.getEmail());
            return ResponseEntity.badRequest().body("User has not set a nickname.");
        }

        logger.info("User nickname found: {}", userNicknameOptional.getNickname());

        // Get or create Peer Support Group
        PeerSupportGroup group = getOrCreatePeerGroup();
        if (group == null) {
            logger.error("Failed to fetch or create peer support group.");
            return ResponseEntity.status(500).body("Error: Could not fetch support group.");
        }

        logger.info("Peer support group found/created: {}", group.getGroupName());

        // Set message details
        chatMessage.setUser(user);
        chatMessage.setNickname(userNicknameOptional.getNickname());
        chatMessage.setPeerSupportGroup(group);
        chatMessage.setTimestamp(LocalDateTime.now());

        logger.info("Saving message: {}", chatMessage);
        try {
            chatMessageDao.save(chatMessage);
        } catch (Exception e) {
            logger.error("Error saving message: ", e);
            return ResponseEntity.status(500).body("Internal server error while saving message.");
        }

        logger.info("Message saved successfully. Sending via WebSocket...");
        messagingTemplate.convertAndSend("/topic/messages", chatMessage);

        logger.info("Message sent successfully.");
        return ResponseEntity.ok("Message sent successfully!");
    }


    // 🔹 Get All Messages from Peer Support Group
    @Transactional
    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getAllMessages(HttpServletRequest request) {
        log.info("📥 Received request to fetch messages.");

        // Extract authenticated username
        String username = getAuthenticatedUsername(request);
        if (username == null) {
            log.warn("❌ Authentication failed: No valid username extracted.");
            return ResponseEntity.status(403).body(null);
        }

        log.info("✅ Authenticated username: {}", username);

        // Fetch messages from database
        try {
            List<ChatMessage> messages = chatMessageDao.findByPeerSupportGroup_GroupId(GROUP_ID);
            log.info("📜 Retrieved {} messages from group ID: {}", messages.size(), GROUP_ID);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("⚠️ Error retrieving messages: ", e);
            return ResponseEntity.status(500).body(null);
        }
    }

}
