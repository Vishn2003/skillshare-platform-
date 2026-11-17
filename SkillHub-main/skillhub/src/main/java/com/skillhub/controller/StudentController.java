package com.skillhub.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.skillhub.dto.LoginDTO;
import com.skillhub.entity.Student;
import com.skillhub.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Register Student
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(@Valid @RequestBody Student student) {

        Student savedStudent = studentService.registerStudent(student);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {

        if (loginDTO == null || loginDTO.getEmail() == null || loginDTO.getPassword() == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", HttpStatus.BAD_REQUEST.value());
            error.put("message", "Email and password are required");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        Optional<Student> loggedInStudent =
                studentService.login(loginDTO.getEmail(), loginDTO.getPassword());

        if (loggedInStudent.isPresent()) {
            return ResponseEntity.ok(loggedInStudent.get());
        }

        Map<String, Object> error = new HashMap<>();
        error.put("status", HttpStatus.UNAUTHORIZED.value());
        error.put("message", "Invalid email or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    // Get All Students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {

        Student student = studentService.getStudentById(id);

        return ResponseEntity.ok(student);
    }

    // Update Student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id,
                                                 @RequestBody Student student) {

        Student updatedStudent = studentService.updateStudent(id, student);

        return ResponseEntity.ok(updatedStudent);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok("Student deleted successfully.");
    }
}