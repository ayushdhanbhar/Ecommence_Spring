package com.teluskp.SpringEcom.repo;

import com.teluskp.SpringEcom.model.User;
import com.teluskp.SpringEcom.repo.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}