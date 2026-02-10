package com.example.Airbnb.Repositories;

import com.example.Airbnb.Dto.GuestDTO;
import com.example.Airbnb.Entities.GuestEntity;
import com.example.Airbnb.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<GuestEntity, Long> {
    List<GuestDTO> findByUser(UserEntity user);
}
