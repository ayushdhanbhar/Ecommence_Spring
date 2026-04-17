package com.teluskp.SpringEcom.controller;

import com.teluskp.SpringEcom.model.dto.OrderRequest;
import com.teluskp.SpringEcom.model.dto.OrderResponse;
import com.teluskp.SpringEcom.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @PostMapping("/orders/place")
   public ResponseEntity<OrderResponse>placeOrder(@RequestBody OrderRequest orderRequest) {
       OrderResponse orderResponse = orderService.placeOrder(orderRequest);
       return new ResponseEntity<>(orderResponse, HttpStatus.OK);
   }

   @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        List<OrderResponse>responses = orderService.getAllOrdersResponses();
        return new ResponseEntity<>(responses,HttpStatus.OK);
   }
}
