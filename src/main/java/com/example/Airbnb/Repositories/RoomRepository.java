package com.example.Airbnb.Repositories;

import com.example.Airbnb.Entities.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository  extends JpaRepository<RoomEntity,Long> {
}
