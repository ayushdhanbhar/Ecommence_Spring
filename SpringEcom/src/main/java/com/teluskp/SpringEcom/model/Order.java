package com.teluskp.SpringEcom.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name="orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    String orderId;
    String customerName;
    String email;
    String status;
    LocalDate orderDate;
    @OneToMany(mappedBy ="order", cascade = CascadeType.ALL)
    List<OrderItem> orderItems;
}
