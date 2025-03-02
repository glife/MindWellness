package com.inn.mind_wellness.POJO;


import jakarta.persistence.*;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serial;
import java.io.Serializable;

@NamedQuery(name = "User.findByEmailAndPassword",
        query = "SELECT u FROM User u WHERE u.email = :email AND u.password = :password")

@NamedQuery(name = "User.findByEmail",
        query = "SELECT u FROM User u WHERE u.email = :email")

@Slf4j
@Data  // Lombok generates getters and setters
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email"}) // Unique constraint on email
})
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "contact_no", nullable = false)
    private String contactNo;

    // Example log function
    public void logUserInfo() {
        log.info("User Information: Name = {}, Email = {}", name, email);
    }
}
