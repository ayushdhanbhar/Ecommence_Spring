package com.teluskp.SpringEcom.service;
import com.teluskp.SpringEcom.model.OrderItem;
import com.teluskp.SpringEcom.model.Product;
import com.teluskp.SpringEcom.model.dto.OrderItemRequest;
import com.teluskp.SpringEcom.model.dto.OrderRequest;
import com.teluskp.SpringEcom.model.dto.OrderResponse;
import com.teluskp.SpringEcom.model.Order;
import com.teluskp.SpringEcom.model.dto.OrderitemResponse;
import com.teluskp.SpringEcom.repo.Orderrepo;
import com.teluskp.SpringEcom.repo.Productrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private Productrepo productrepo;
    @Autowired
    private Orderrepo orderrepo;

    public OrderResponse placeOrder(OrderRequest orderRequest){

        Order order = new Order();
        String orderId = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        order.setOrderId(orderId);
        order.setCustomerName(orderRequest.customerName());
        order.setEmail(orderRequest.email());
        order.setStatus("Placed");
        order.setOrderDate(LocalDate.now());

        List<OrderItem> orderItems = new ArrayList<>();
        for(OrderItemRequest itemReq : orderRequest.items()){
            Product product = productrepo
                    .findById(itemReq.productId())
                    .orElseThrow(()->new RuntimeException("Product not found"));
            product.setStockQuantity(product.getStockQuantity() - itemReq.quantity());
            productrepo.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.quantity())
                    .totalprice(product.getPrice().multiply(BigDecimal.valueOf(itemReq.quantity())))
                    .order(order)
                    .build();
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);
        Order savedOrder = orderrepo.save(order);
        List<OrderitemResponse> itemResponses = new ArrayList<>();
        for (OrderItem item : order.getOrderItems()) {
            OrderitemResponse orderItemResponse = new OrderitemResponse(
                    item.getProduct().getName(),
                    item.getQuantity(),
                    item.getTotalprice()
            );
            itemResponses.add(orderItemResponse);
        }

        OrderResponse orderResponse = new OrderResponse(
                savedOrder.getOrderId(),
                savedOrder.getCustomerName(),
                savedOrder.getEmail(),
                savedOrder.getStatus(),
                savedOrder.getOrderDate(),
                itemResponses
        );
        return orderResponse;
    }

    public List<OrderResponse> getAllOrdersResponses() {
        List<Order> orders = orderrepo.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();

        for (Order order : orders) {


            List<OrderitemResponse> itemResponses = new ArrayList<>();

            for(OrderItem item : order.getOrderItems()) {
                OrderitemResponse orderItemResponse = new OrderitemResponse(
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getTotalprice()
                );
                itemResponses.add(orderItemResponse);

            }
            OrderResponse orderResponse = new OrderResponse(
                    order.getOrderId(),
                    order.getCustomerName(),
                    order.getEmail(),
                    order.getStatus(),
                    order.getOrderDate(),
                    itemResponses
            );
            orderResponses.add(orderResponse);
        }

        return orderResponses;
    }
}
