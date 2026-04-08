package com.hcl.HealthSync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcl.HealthSync.model.Slot;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import jakarta.persistence.LockModeType;

public interface SlotRepository extends JpaRepository<Slot, Long>{
	
	 @Lock(LockModeType.PESSIMISTIC_WRITE)
	    @Query("SELECT s FROM Slot s WHERE s.id = :id")
	    Optional<Slot> findByIdForUpdate(Long id);

}
