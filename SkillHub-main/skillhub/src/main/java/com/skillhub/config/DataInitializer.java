package com.skillhub.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.skillhub.entity.Skill;
import com.skillhub.entity.Student;
import com.skillhub.entity.StudentSkill;
import com.skillhub.repository.SkillRepository;
import com.skillhub.repository.StudentRepository;
import com.skillhub.repository.StudentSkillRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private StudentSkillRepository studentSkillRepository;

    @Override
    public void run(String... args) {
        // Seed default skills if not present
        Optional<Skill> existingSkill = skillRepository.findBySkillName("Java");
        Skill javaSkill;
        if (existingSkill.isEmpty()) {
            javaSkill = new Skill();
            javaSkill.setSkillName("Java");
            javaSkill.setCategory("Programming");
            javaSkill = skillRepository.save(javaSkill);
        } else {
            javaSkill = existingSkill.get();
        }

        // Seed default mentor: Rahul
        if (studentRepository.findByEmail("rahul@gmail.com").isEmpty()) {
            Student rahul = new Student();
            rahul.setName("Rahul");
            rahul.setEmail("rahul@gmail.com");
            rahul.setPassword("1234");
            rahul.setDepartment("CSE");
            rahul.setYear(3);
            rahul = studentRepository.save(rahul);

            // Give Rahul the Java skill
            StudentSkill ss = new StudentSkill();
            ss.setStudent(rahul);
            ss.setSkill(javaSkill);
            ss.setLevel("Advanced");
            studentSkillRepository.save(ss);
        }

        // Seed default learner: Arun
        if (studentRepository.findByEmail("arun@gmail.com").isEmpty()) {
            Student arun = new Student();
            arun.setName("Arun");
            arun.setEmail("arun@gmail.com");
            arun.setPassword("1234");
            arun.setDepartment("IT");
            arun.setYear(2);
            studentRepository.save(arun);
        }
    }
}
