package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.dto.AuthResponseDTO;
import com.app.appointmentbooker.dto.LoginDto;
import com.app.appointmentbooker.dto.RegisterDto;
import com.app.appointmentbooker.model.Role;
import com.app.appointmentbooker.model.UserEntity;
import com.app.appointmentbooker.repository.RoleRepository;
import com.app.appointmentbooker.repository.UserRepository;
import com.app.appointmentbooker.security.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                          JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }


    @PostMapping("register")
    public ResponseEntity<String> register(
            @RequestBody RegisterDto registerDto
            ) {
        System.out.println(userRepository.existsByUsername(registerDto.getUsername()));
        System.out.println(userRepository.findByUsername(registerDto.getUsername()));
        System.out.println(registerDto.toString());
        if(userRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>("Username is taken!",
                    HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!",
                HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(
            @RequestBody LoginDto loginDto
            ){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                ));

        System.out.println("Auth: " + authentication);

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);



        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token),
                HttpStatus.OK);
    }










































}
