package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.dto.AuthResponseDTO;
import com.app.appointmentbooker.dto.LoginDto;
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

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                          JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

//    @PostMapping("register")
//    public ResponseEntity<String> register(
//            @RequestBody RegisterDto registerDto
//            ) {
//        if(userRepository.existsByUsername(registerDto.getUsername())) {
//            return new ResponseEntity<>("Username is taken!",
//                    HttpStatus.BAD_REQUEST);
//        }
//
//        UserEnttity user = new UserEnttity();
//        user.setUsername(registerDto.getUsername());
//        user.setPassword(passwordEncoder.encode(registerDto.getPasword()));
//
//        Role roles = roleRepository.findByName("USER").get();
//        user.setRoles(Collections.singletonList(roles));
//
//        userRepository.save(user);
//
//        return new ResponseEntity<>("User registered success!",
//                HttpStatus.OK);
//    }



    @PostMapping("register")
    public ResponseEntity<String> register(
            @RequestBody UserEntity userEntity
    ) {
        if(userRepository.existsByUsername(userEntity.getUsername())) {
            return new ResponseEntity<>("Username is taken!",
                    HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setUsername(userEntity.getUsername());
        user.setPassword(passwordEncoder.encode(userEntity.getPassword()));

        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return new ResponseEntity<>("User registered success!",
                HttpStatus.OK);
    }


//    @PostMapping("login")
//    public ResponseEntity<String> login(
//            @RequestBody UserEntity userEntity
//    ){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        userEntity.getUsername(),
//                        userEntity.getPassword()
//                ));
//
//        SecurityContextHolder.getContext()
//                .setAuthentication(authentication);
//        return new ResponseEntity<>("User signed in success!",
//                HttpStatus.OK);
//    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(
            @RequestBody LoginDto loginDto
            ){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                ));

        SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token),
                HttpStatus.OK);
    }










































}
