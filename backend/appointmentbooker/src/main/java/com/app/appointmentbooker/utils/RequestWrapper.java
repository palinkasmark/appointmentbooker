package com.app.appointmentbooker.utils;

import java.time.LocalTime;

import com.app.appointmentbooker.model.BookingDetails;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestWrapper {
    BookingDetails bookingDetails;
    LocalTime time;
}
