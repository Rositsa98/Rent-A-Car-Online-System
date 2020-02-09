package com.fmi.course.spring.project.rentacar.service.impl;

import com.fmi.course.spring.project.rentacar.dao.IUsersRepository;
import com.fmi.course.spring.project.rentacar.exception.NonexisitngEntityException;
import com.fmi.course.spring.project.rentacar.model.User;
import com.fmi.course.spring.project.rentacar.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService implements IUserService {

    @Autowired
    IUsersRepository usersRepository;

    @Override
    public List<User> findAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public User findUserById(String id) {
        return usersRepository.findById(id).orElseThrow(() -> new NonexisitngEntityException(
                String.format("User with ID='%s' does not exist.", id)));
    }

    @Override
    public User addUser(User user) {
        if (user.getRoles() == null || user.getRoles().size() == 0) {
            List<String> roles = new ArrayList<>();
            roles.add("ROLE_USER");
            user.setRoles(roles);
        }
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        return usersRepository.insert(user);
    }

    @Override
    public User updateUser(User user) {
        Optional<User> old = usersRepository.findById(user.getId());
        if (!old.isPresent()) {
            throw new NonexisitngEntityException(
                    String.format("User with ID='%s' does not exist.", user.getId()));
        }
        //if needed update update time, etc
        return usersRepository.save(user);
    }

    @Override
    public User deleteUser(String id) {
        Optional<User> old = usersRepository.findById(id);
        if (!old.isPresent()) {
            throw new NonexisitngEntityException(
                    String.format("User with ID='%s' does not exist.", id));
        }
        usersRepository.deleteById(id);
        return old.get();
    }

    @Override
    public User findUserByUsername(String username) {
        return usersRepository.findByUsername(username).orElseThrow(() -> new NonexisitngEntityException(
                String.format("User with username='%s' does not exist.", username)));
    }

    @Override
    public long count() {
        return usersRepository.count();
    }

    @Override
    public List<String> findUserRoles(String username) {
        return usersRepository.findByUsername(username).get().getRoles();
    }
}
