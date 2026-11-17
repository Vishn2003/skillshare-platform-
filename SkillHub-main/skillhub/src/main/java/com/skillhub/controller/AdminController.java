package com.skillhub.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.skillhub.dto.AdminLoginDTO;
import com.skillhub.entity.Skill;
import com.skillhub.service.LearningRequestService;
import com.skillhub.service.RatingService;
import com.skillhub.service.SkillService;
import com.skillhub.service.StudentService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Value("${admin.username:admin}")
    private String configuredAdminUsername;

    @Value("${admin.password:Admin@SkillHub2026}")
    private String configuredAdminPassword;

    @Value("${admin.token:skillhub-admin-secure-token-883921}")
    private String configuredAdminToken;

    @Autowired
    private StudentService studentService;

    @Autowired
    private SkillService skillService;

    @Autowired
    private LearningRequestService learningRequestService;

    @Autowired
    private RatingService ratingService;

    /**
     * Helper to validate administrator authorization header
     */
    private boolean isAuthorized(String tokenHeader) {
        if (tokenHeader == null || tokenHeader.isBlank()) {
            return false;
        }
        String cleanToken = tokenHeader.startsWith("Bearer ") ? tokenHeader.substring(7).trim() : tokenHeader.trim();
        return configuredAdminToken.equals(cleanToken);
    }

    /**
     * Admin Authentication Endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginDTO loginDTO) {
        if (loginDTO == null || loginDTO.getUsername() == null || loginDTO.getPassword() == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", HttpStatus.BAD_REQUEST.value());
            error.put("message", "Username and password are required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        if (configuredAdminUsername.equals(loginDTO.getUsername().trim()) &&
            configuredAdminPassword.equals(loginDTO.getPassword())) {
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", configuredAdminToken);
            response.put("username", configuredAdminUsername);
            response.put("role", "ADMIN");
            response.put("message", "Administrator authenticated successfully.");
            return ResponseEntity.ok(response);
        }

        Map<String, Object> error = new HashMap<>();
        error.put("status", HttpStatus.UNAUTHORIZED.value());
        error.put("message", "Invalid administrator credentials.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    /**
     * Admin Session Verification
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifySession(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (isAuthorized(token)) {
            Map<String, Object> res = new HashMap<>();
            res.put("valid", true);
            res.put("role", "ADMIN");
            return ResponseEntity.ok(res);
        }
        Map<String, Object> err = new HashMap<>();
        err.put("valid", false);
        err.put("message", "Invalid or expired admin session token.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
    }

    /**
     * Secured Student Management
     */
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id, @RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        studentService.deleteStudent(id);
        return ResponseEntity.ok(Map.of("message", "Student record deleted successfully."));
    }

    /**
     * Secured Skill Catalog Management
     */
    @GetMapping("/skills")
    public ResponseEntity<?> getAllSkills(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @PostMapping("/skills")
    public ResponseEntity<?> createSkill(@RequestBody Skill skill, @RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.addSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id, @RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        skillService.deleteSkill(id);
        return ResponseEntity.ok(Map.of("message", "Skill removed successfully."));
    }

    /**
     * Secured Learning Request Management
     */
    @GetMapping("/requests")
    public ResponseEntity<?> getAllRequests(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        return ResponseEntity.ok(learningRequestService.getAllRequestDTOs());
    }

    @DeleteMapping("/requests/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long id, @RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        learningRequestService.deleteRequest(id);
        return ResponseEntity.ok(Map.of("message", "Request removed successfully."));
    }

    /**
     * Secured Ratings Management
     */
    @GetMapping("/ratings")
    public ResponseEntity<?> getAllRatings(@RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        return ResponseEntity.ok(ratingService.getAllRatings());
    }

    @DeleteMapping("/ratings/{id}")
    public ResponseEntity<?> deleteRating(@PathVariable Long id, @RequestHeader(value = "X-Admin-Token", required = false) String token) {
        if (!isAuthorized(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Unauthorized: Admin access required."));
        }
        ratingService.deleteRating(id);
        return ResponseEntity.ok(Map.of("message", "Rating removed successfully."));
    }
}
