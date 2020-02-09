package com.fmi.course.spring.project.rentacar.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Document(collection = "users")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    private String id;
    @NonNull
    @NotNull
    @Size(min = 3, max = 60)
    private String username;
    @NonNull
    @NotBlank
    private String password;
    private String pictureUrl;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String roles;

    private boolean active = true;

    @PastOrPresent
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime created = LocalDateTime.now();
    @PastOrPresent
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime modified = LocalDateTime.now();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(roles.split("\\s*,\\s*")).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public String getRoles() {
        return roles;
    }

    public String getId() {
        return id;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return active;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}