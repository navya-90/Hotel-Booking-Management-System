package com.example.Airbnb.Service.Interfaces;

import com.example.Airbnb.Dto.HotelPriceDTO;
import com.example.Airbnb.Dto.HotelSearchRequest;
import com.example.Airbnb.Dto.InventoryDTO;
import com.example.Airbnb.Dto.UpdateInventoryRequestDTO;
import com.example.Airbnb.Entities.RoomEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface InventoryService {
    void initializeRoomForAYear(RoomEntity room);

    void deleteAllInventories(RoomEntity room);

    Page<HotelPriceDTO> searchHotels(HotelSearchRequest hotelSearchRequest);

    List<InventoryDTO> getAllInventoryByRoom(Long roomId);

    void updateInventory(Long roomId, UpdateInventoryRequestDTO updateInventoryRequestDto);
}
