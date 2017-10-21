package linhtran.it.vnua.sale.controller;

import linhtran.it.vnua.sale.entities.Customer;
import linhtran.it.vnua.sale.entities.Order;
import linhtran.it.vnua.sale.entities.OrderDetail;
import linhtran.it.vnua.sale.entities.User;
import linhtran.it.vnua.sale.form.CustomerLoginForm;
import linhtran.it.vnua.sale.form.EngredientForm;
import linhtran.it.vnua.sale.form.OrderChangeInfoForm;
import linhtran.it.vnua.sale.form.OrderForm;
import linhtran.it.vnua.sale.service.*;
import linhtran.it.vnua.sale.util.Message;
import linhtran.it.vnua.sale.util.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by linhtran on 04/10/17.
 */

@RestController
public class ShopController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmployeeService employeeService;


    @CrossOrigin("*")
    @PostMapping(value = "order/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderForm orderForm) {
        Customer customer = this.customerService.getCustomerByEmailAndPassWord(
                orderForm.getCustomerLoginForm().getEmail(), orderForm.getCustomerLoginForm().getPassWord());

        if (customer == null) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }

        Order order = new Order();
        order.setStatus(OrderStatus.CREATE);

        order.setCustomer(customer);
        User user = this.userService.findByEmail("admin@gmail.com");
        order.setUser(user);
        Set<OrderDetail> detailSet = new HashSet<>();
        OrderDetail detail;

        for (EngredientForm engredientForm : orderForm.getEngredients()) {
            detail = engredientForm.toOrderDetail();
            detailSet.add(detail);
        }


        order.setOrderDetails(detailSet);

        this.orderService.save(order);

        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @PostMapping(value = "order/find-all")
    public ResponseEntity<Set<Order>> getOrderByCustomer(@RequestBody CustomerLoginForm customerLoginForm) {
        Customer customer = this.customerService.getCustomerByEmailAndPassWord(
                customerLoginForm.getEmail(), customerLoginForm.getPassWord());

        if (customer == null) {
            return new ResponseEntity<Set<Order>>(new HashSet<Order>(), HttpStatus.BAD_REQUEST);
        }

        Set<Order> orders = this.orderService.findOrderByCustomerId(customer.getId());

        return new ResponseEntity<Set<Order>>(orders, HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "/admin/order/find-all")
    public ResponseEntity<Set<Order>> getOrder() {
        Set<Order> orders = this.orderService.finAll();
        return new ResponseEntity<Set<Order>>(orders, HttpStatus.OK);
    }


    @CrossOrigin("*")
    @PutMapping(value = "/admin/order/update")
    public ResponseEntity<String> update(@RequestBody OrderChangeInfoForm infoForm) {
        Set<Order> orders = this.orderService.finAll();

        Order order = this.orderService.findOne(infoForm.getId());

        User user = this.userService.findOne(infoForm.getIdUser());

        if (order == null || user == null) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }

        order.setStatus(infoForm.getStatus());
        order.setUser(user);

        this.orderService.save(order);

        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }

}
