package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.Order;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 28/09/17.
 */
@Repository
@Transactional
public interface OrderRepository extends CrudRepository<Order,Long> {
}
