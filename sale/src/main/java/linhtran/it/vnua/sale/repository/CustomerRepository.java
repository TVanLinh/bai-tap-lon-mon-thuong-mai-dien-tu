package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Customer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 28/09/17.
 */

@Repository
@Transactional
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer getCustomerByEmailAndPassWord(String email, String passWord);

    Customer getCustomerByEmail(String email);
}
