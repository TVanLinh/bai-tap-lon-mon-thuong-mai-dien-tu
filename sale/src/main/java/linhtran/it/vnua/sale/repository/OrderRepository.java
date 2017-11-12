package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Order;
import linhtran.it.vnua.sale.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Set;

/**
 * Created by linhtran on 28/09/17.
 */
@Repository
@Transactional
public interface OrderRepository extends CrudRepository<Order, Long> {
    Set<Order> findOrderByCustomerId(long customerId);

    Set<Order> findByUser(User user);
}
