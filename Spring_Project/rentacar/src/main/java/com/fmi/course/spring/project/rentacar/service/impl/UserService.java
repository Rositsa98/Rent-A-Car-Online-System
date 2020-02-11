package com.fmi.course.spring.project.rentacar.service.impl;

import com.fmi.course.spring.project.rentacar.dao.IUsersRepository;
import com.fmi.course.spring.project.rentacar.exception.NonexisitngEntityException;
import com.fmi.course.spring.project.rentacar.model.User;
import com.fmi.course.spring.project.rentacar.model.registration.RegistrationRequest;
import com.fmi.course.spring.project.rentacar.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

        Optional<User> old = usersRepository.findByUsername(user.getUsername());

        if(old.isPresent()){
            return null;
        }

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

    @Override
    public User convertRegistrationRequestToUser(RegistrationRequest registrationRequest) {
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(registrationRequest.getPassword());

        List<String> roles = new ArrayList<>();
        if(registrationRequest.getRole()!=null && registrationRequest.getRole()!=""){
            roles.add(registrationRequest.getRole());
        } else{
            roles.add("ROLE_USER");
        }
        user.setRoles(roles);
        user.setActive(true);
        user.setCreated(LocalDateTime.now());
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setPhoneNumber(registrationRequest.getPhone());
        user.setModified(LocalDateTime.now());
        user.setPictureUrl(null);

        return user;
    }
}
