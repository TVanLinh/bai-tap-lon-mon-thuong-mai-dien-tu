package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.Customer;
import linhtran.it.vnua.sale.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 28/09/17.
 */

@Service
@Transactional
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public void save(Customer customer) {
        this.customerRepository.save(customer);
    }

    public void delete(Customer customer) {
        this.customerRepository.delete(customer);
    }

    public Customer getCustomerByEmailAndPassWord(String email, String passWord) {
        return this.customerRepository.getCustomerByEmailAndPassWord(email, passWord);
    }

    public Customer getCustomerByEmail(String email) {
        return  this.customerRepository.getCustomerByEmail(email);
    }
}
