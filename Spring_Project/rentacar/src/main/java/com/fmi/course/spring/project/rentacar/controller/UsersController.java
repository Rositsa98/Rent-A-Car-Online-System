package com.fmi.course.spring.project.rentacar.controller;

import com.fmi.course.spring.project.rentacar.exception.InvalidEntityException;
import com.fmi.course.spring.project.rentacar.model.User;
import com.fmi.course.spring.project.rentacar.model.authentication.AuthenticationResponse;
import com.fmi.course.spring.project.rentacar.model.registration.RegistrationRequest;
import com.fmi.course.spring.project.rentacar.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private UserService usersService;

    @GetMapping
    public List<User> getUsers() {
        return usersService.findAllUsers();
    }

    @GetMapping("{id}")
    public User getUserById(@PathVariable("id") String userId) {
        return usersService.findUserById(userId);
    }

    @PostMapping
    public ResponseEntity<User> addUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            String message = bindingResult.getFieldErrors().stream()
                    .map(err -> String.format("Invalid '%s' -> '%s': %s\n",
                            err.getField(), err.getRejectedValue(), err.getDefaultMessage()))
                    .reduce("", (acc, errStr) -> acc + errStr);
            throw new InvalidEntityException(message);
        }
        User created = usersService.addUser(user);
        return ResponseEntity.created(
                ServletUriComponentsBuilder.fromCurrentRequest().pathSegment("{id}").build(created.getId()))
                .body(created);
    }

    @PutMapping("{id}")
    public User update(@PathVariable String id, @Valid @RequestBody User user) {
        if (!id.equals(user.getId())) {
            throw new InvalidEntityException(
                    String.format("Entity ID='%s' is different from URL resource ID='%s'", user.getId(), id));
        }
        return usersService.updateUser(user);
    }

    @DeleteMapping("{id}")
    public User remove(@PathVariable String id) {
        return usersService.deleteUser(id);
    }

    @RequestMapping(value = "/roles", method = RequestMethod.GET)
    public String getUserRoles(@RequestHeader String username) {
        List<String> roles = usersService.findUserRoles(username);

        for (String role : roles) {
            if (role.equals("ROLE_ADMIN")) {
                return "Admin";

            }
            if (role.equals("ROLE_OPERATOR")) {
                return "Operator";
            }
        }
        return "User";
    }

    @RequestMapping(value = "/registerUser", method = RequestMethod.POST)
    public ResponseEntity<User> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        User user = usersService.convertRegistrationRequestToUser(registrationRequest);
        User resultUser = usersService.addUser(user);


        if(resultUser == null){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.created(
                ServletUriComponentsBuilder.fromCurrentRequest().pathSegment("{id}").build(resultUser.getId()))
                .body(resultUser);
    }

}
