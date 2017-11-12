package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.Order;
import linhtran.it.vnua.sale.entities.User;
import linhtran.it.vnua.sale.repository.OrderRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by linhtran on 04/10/17.
 */

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public void save(Order order) {
        this.orderRepository.save(order);
    }

    public Set<Order> findOrderByCustomerId(long customerId) {
        return this.orderRepository.findOrderByCustomerId(customerId);
    }

    public Set<Order> finAll() {
        Set<Order> orders = new HashSet<>();
        for (Order order : this.orderRepository.findAll()) {
            orders.add(order);
        }
        return orders;
    }

    public Set<Order> findByUser(User user) {
        return this.orderRepository.findByUser(user);
    }

    public Order findOne(long id) {
        return this.orderRepository.findOne(id);
    }

}
