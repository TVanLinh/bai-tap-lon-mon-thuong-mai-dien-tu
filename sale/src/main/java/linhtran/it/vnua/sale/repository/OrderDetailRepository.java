package linhtran.it.vnua.sale.repository;

import linhtran.it.vnua.sale.entities.OrderDetail;
import linhtran.it.vnua.sale.form.StatisticForm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Collection;

/**
 * Created by linhtran on 28/09/17.
 */
@Repository
@Transactional
public interface OrderDetailRepository extends CrudRepository<OrderDetail,Long> {
//
//    @Query(value = "SELECT new linhtran.it.vnua.sale.form.StatisticForm( product.name, sum(order_detail.amount), " +
//            "sum(order_detail.amount * order_detail.price) )" +
//            "FROM (order_detail  INNER JOIN product  ON order_detail.id_product = product.id) " +
//            " INNER JOIN orders ON order_detail.id_order = orders.id " +
//            "WHERE MONTH(orders.create_time ) = 10 " +
//            "GROUP BY order_detail.id_product")
//    Collection<StatisticForm> statisticByMonth();
}
