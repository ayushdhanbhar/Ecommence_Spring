package com.teluskp.SpringEcom.repo;
import com.teluskp.SpringEcom.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface Orderrepo extends JpaRepository<Order,Integer> {
    Optional<Order> findByOrderId(String orderId);
}
