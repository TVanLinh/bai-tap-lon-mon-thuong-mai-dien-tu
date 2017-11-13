package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Customer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

/**
 * Created by linhtran on 28/09/17.
 */

@Repository
@Transactional
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    Customer getCustomerByEmailAndPassWord(String email, String passWord);

    Customer getCustomerByEmail(String email);

    @Query(value = "select distinct * from customer c where c.full_name like %:query% or c.email like %:query% or c.address like %:query% or c.phone like %:query% ", nativeQuery = true)
    Set<Customer> findBy(@Param(value = "query") String query);
}
