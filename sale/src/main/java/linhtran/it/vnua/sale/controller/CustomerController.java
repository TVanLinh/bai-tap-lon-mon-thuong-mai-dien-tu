package linhtran.it.vnua.sale.controller;

import linhtran.it.vnua.sale.entities.Customer;
import linhtran.it.vnua.sale.form.CustomerLoginForm;
import linhtran.it.vnua.sale.form.CustomerRegisterForm;
import linhtran.it.vnua.sale.mail.MailService;
import linhtran.it.vnua.sale.service.CustomerService;
import linhtran.it.vnua.sale.util.Message;
import linhtran.it.vnua.sale.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by linhtran on 28/09/17.
 */

@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private MailService mailService;

    @PostMapping("/customer")
    public ResponseEntity<String> createCustomer(@Valid @RequestBody CustomerRegisterForm customerRegisterForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<String>(Message.getError(bindingResult), HttpStatus.BAD_REQUEST);

        }


        if (this.customerService.getCustomerByEmail(customerRegisterForm.getEmail()) != null) {
            return new ResponseEntity<String>(customerRegisterForm.getEmail() + " " + Message.EXIST_ALREADY, HttpStatus.ALREADY_REPORTED);
        }

        if (customerRegisterForm.getPassWord().equals(customerRegisterForm.getRePassWord())) {
            return new ResponseEntity<String>(Message.PASS_WORD_NOT_OVERLAP, HttpStatus.BAD_REQUEST);
        }
        this.customerService.save(customerRegisterForm.toCustomer());
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);

    }


    @PutMapping("/customer")
    public ResponseEntity<String> changePassWord(@RequestBody CustomerRegisterForm customerRegisterForm) {
        Customer customer;
        if (customerRegisterForm.getEmail() == null
                || (customer = this.customerService.getCustomerByEmail(customerRegisterForm.getEmail())) == null) {
            return new ResponseEntity<String>(customerRegisterForm.getEmail() + " " + Message.NOT_EXIST, HttpStatus.BAD_REQUEST);
        }
        customer.setPassWord(StringUtils.generateRandomPassword());
        this.customerService.save(customer);
        this.mailService.sendMail(customer.getEmail(), "Change mail from shop sale linh tran ", "Password change is: " + customer.getPassWord());
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }


    @PostMapping(value = "/customer/login")
    public ResponseEntity<Customer> getCustomer(@RequestBody CustomerLoginForm customerLoginForm) {

        Customer customer;
        if ((customer = this.customerService.getCustomerByEmailAndPassWord(customerLoginForm.getEmail(), customerLoginForm.getPassWord())) == null) {
            return new ResponseEntity<Customer>(customer, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Customer>(customer, HttpStatus.OK);
    }
}
