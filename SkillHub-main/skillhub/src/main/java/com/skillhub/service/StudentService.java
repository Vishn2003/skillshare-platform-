package com.skillhub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.skillhub.exception.ResourceNotFoundException;
import com.skillhub.entity.Student;
import com.skillhub.entity.StudentSkill;
import com.skillhub.entity.LearningRequest;
import com.skillhub.entity.Rating;
import com.skillhub.repository.StudentRepository;
import com.skillhub.repository.StudentSkillRepository;
import com.skillhub.repository.LearningRequestRepository;
import com.skillhub.repository.RatingRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentSkillRepository studentSkillRepository;

    @Autowired
    private LearningRequestRepository learningRequestRepository;

    @Autowired
    private RatingRepository ratingRepository;

    // Register Student
    public Student registerStudent(Student student) {
        if (student.getEmail() != null) {
            student.setEmail(student.getEmail().trim());
        }
        if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
            throw new IllegalArgumentException("An account with email " + student.getEmail() + " already exists.");
        }
        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student by ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Student not found with ID: " + id));
    }

    // Update Student
    public Student updateStudent(Long id, Student updatedStudent) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        student.setName(updatedStudent.getName());
        student.setEmail(updatedStudent.getEmail());
        if (updatedStudent.getPassword() != null && !updatedStudent.getPassword().isBlank()) {
            student.setPassword(updatedStudent.getPassword());
        }
        student.setDepartment(updatedStudent.getDepartment());
        student.setYear(updatedStudent.getYear());

        return studentRepository.save(student);
    }

    // Safe Delete Student with relational cleanup
    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));

        // Clean up ratings where student is learner or mentor
        List<Rating> ratings = ratingRepository.findAll();
        for (Rating r : ratings) {
            if ((r.getLearner() != null && r.getLearner().getStudentId().equals(id)) ||
                (r.getMentor() != null && r.getMentor().getStudentId().equals(id))) {
                ratingRepository.delete(r);
            }
        }

        // Clean up requests where student is learner or mentor
        List<LearningRequest> requests = learningRequestRepository.findAll();
        for (LearningRequest lr : requests) {
            if ((lr.getLearner() != null && lr.getLearner().getStudentId().equals(id)) ||
                (lr.getMentor() != null && lr.getMentor().getStudentId().equals(id))) {
                learningRequestRepository.delete(lr);
            }
        }

        // Clean up associated student skills
        List<StudentSkill> skills = studentSkillRepository.findByStudentStudentId(id);
        for (StudentSkill ss : skills) {
            studentSkillRepository.delete(ss);
        }

        studentRepository.delete(student);
    }

    // Login
    public Optional<Student> login(String email, String password) {
        if (email == null || password == null) {
            return Optional.empty();
        }

        String trimmedEmail = email.trim();
        Optional<Student> student = studentRepository.findByEmail(trimmedEmail);

        if (student.isEmpty()) {
            student = studentRepository.findByEmail(trimmedEmail.toLowerCase());
        }

        if (student.isPresent() &&
            student.get().getPassword() != null &&
            student.get().getPassword().equals(password)) {
            return student;
        }

        return Optional.empty();
    }
}
