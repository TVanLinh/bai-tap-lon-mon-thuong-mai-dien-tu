package linhtran.it.vnua.sale.controller;

import linhtran.it.vnua.sale.entities.Customer;
import linhtran.it.vnua.sale.entities.Employee;
import linhtran.it.vnua.sale.entities.Order;
import linhtran.it.vnua.sale.form.OrderForm;
import linhtran.it.vnua.sale.service.CustomerService;
import linhtran.it.vnua.sale.service.EmployeeService;
import linhtran.it.vnua.sale.service.OrderDetailService;
import linhtran.it.vnua.sale.service.OrderService;
import linhtran.it.vnua.sale.util.Message;
import linhtran.it.vnua.sale.util.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * Created by linhtran on 04/10/17.
 */

@RestController
public class ShopController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value = "order")
    public ResponseEntity<String> createOrder(@RequestBody OrderForm orderForm) {
        Customer customer = this.customerService.getCustomerByEmailAndPassWord(
                orderForm.getCustomerLoginForm().getEmail(), orderForm.getCustomerLoginForm().getPassWord());

        if (customer == null) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }

        Order order = new Order();
        order.setStatus(OrderStatus.CREATE);
//        Employee employee = this.employeeService.findOne(8);
        order.setEmployeeId(8);
        order.setCustomer(customer);
        order.setCreateTime(new Date());
        this.orderService.save(order);
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }
}
