package com.app.appointmentbooker.controller;

import com.app.appointmentbooker.model.Owner;
import com.app.appointmentbooker.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner")
public class OwnerController {

    private final OwnerService ownerService;
    @Autowired
    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public String add(@RequestBody Owner owner) {
        ownerService.saveOwner(owner);
        return "New owner is added";
    }

    @GetMapping("/getAllOwner")
    public List<Owner> getAllOwner(){
        return ownerService.getAllOwner();
    }

}
