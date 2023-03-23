package com.app.appointmentbooker.repository;

import com.app.appointmentbooker.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);

    @Query(
            value = "select booking_date.date from users join user_bookings on users.id = user_bookings.user_id join booking_date on booking_date.id = user_bookings.booking_id where users.username = :username", 
            nativeQuery = true)
    List<?> getReservedDatesByUser(@Param("username") String username);


}
