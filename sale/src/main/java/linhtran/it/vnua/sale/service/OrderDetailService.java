package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.OrderDetail;
import linhtran.it.vnua.sale.form.StatisticForm;
import linhtran.it.vnua.sale.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

/**
 * Created by linhtran on 04/10/17.
 */

@Service
@Transactional
public class OrderDetailService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public void save(OrderDetail orderDetail) {
        this.orderDetailRepository.save(orderDetail);
    }

//

    //    @Query(value = )
    public Collection<StatisticForm> statisticByMonth(int month) {
        String str = "SELECT  product.name, sum(order_detail.amount), " +
                "sum(order_detail.amount * order_detail.price)" +
                "FROM (order_detail  INNER JOIN product  ON order_detail.id_product = product.id) " +
                " INNER JOIN orders ON order_detail.id_order = orders.id " +
                "WHERE MONTH(orders.create_time ) = :month " +
                "GROUP BY order_detail.id_product";


        Collection<Object[]> statisticForms = this.entityManager.createNativeQuery(str).setParameter("month", month).getResultList();
        Collection<StatisticForm> list = new ArrayList<>();
        StatisticForm tmp;
        for (Object[] statisticForm : statisticForms) {
            tmp = new StatisticForm((String) statisticForm[0], ((BigDecimal) statisticForm[1]).intValue(), (Double) statisticForm[2]);
            list.add(tmp);
        }
        return list;
    }


    public Collection<StatisticForm> statisticByDay(Date date) {
        String str = "SELECT  product.name, sum(order_detail.amount), " +
                "sum(order_detail.amount * order_detail.price)" +
                "FROM (order_detail  INNER JOIN product  ON order_detail.id_product = product.id) " +
                " INNER JOIN orders ON order_detail.id_order = orders.id " +
                "WHERE MONTH(orders.create_time ) = :month and DAY (orders.create_time)=:date and YEAR(orders.create_time) = :year " +
                "GROUP BY order_detail.id_product";

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        Collection<Object[]> statisticForms = this.entityManager.createNativeQuery(str)
                .setParameter("month", calendar.get(Calendar.MONTH) + 1)
                .setParameter("date", calendar.get(Calendar.DATE))
                .setParameter("year", calendar.get(Calendar.YEAR)).getResultList();
        Collection<StatisticForm> list = new ArrayList<>();
        StatisticForm tmp;
        for (Object[] statisticForm : statisticForms) {
            tmp = new StatisticForm((String) statisticForm[0], ((BigDecimal) statisticForm[1]).intValue(), (Double) statisticForm[2]);
            list.add(tmp);
        }
        return list;
    }


    public Collection<StatisticForm> statisticByMonth(Date date) {
        String str = "SELECT  product.name, sum(order_detail.amount), " +
                "sum(order_detail.amount * order_detail.price)" +
                "FROM (order_detail  INNER JOIN product  ON order_detail.id_product = product.id) " +
                " INNER JOIN orders ON order_detail.id_order = orders.id " +
                "WHERE MONTH(orders.create_time ) = :month  and YEAR(orders.create_time) = :year " +
                "GROUP BY order_detail.id_product++666";

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        Collection<Object[]> statisticForms = this.entityManager.createNativeQuery(str)
                .setParameter("month", calendar.get(Calendar.MONTH) + 1)
                .setParameter("year", calendar.get(Calendar.YEAR)).getResultList();
        Collection<StatisticForm> list = new ArrayList<>();
        StatisticForm tmp;
        for (Object[] statisticForm : statisticForms) {
            tmp = new StatisticForm((String) statisticForm[0], ((BigDecimal) statisticForm[1]).intValue(), (Double) statisticForm[2]);
            list.add(tmp);
        }
        return list;
    }


    public Collection<StatisticForm> statisticByYear(Date date) {
        String str = "SELECT  product.name, sum(order_detail.amount), " +
                "sum(order_detail.amount * order_detail.price)" +
                "FROM (order_detail  INNER JOIN product  ON order_detail.id_product = product.id) " +
                " INNER JOIN orders ON order_detail.id_order = orders.id " +
                "WHERE YEAR(orders.create_time)= :year " +
                "GROUP BY order_detail.id_product";

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        Collection<Object[]> statisticForms = this.entityManager.createNativeQuery(str)
                .setParameter("year", calendar.get(Calendar.YEAR)).getResultList();
        Collection<linhtran.it.vnua.sale.form.StatisticForm> list = new ArrayList<>();
        linhtran.it.vnua.sale.form.StatisticForm tmp;
        for (Object[] statisticForm : statisticForms) {
            tmp = new linhtran.it.vnua.sale.form.StatisticForm((String) statisticForm[0], ((BigDecimal) statisticForm[1]).intValue(), (Double) statisticForm[2]);
            list.add(tmp);
        }
        return list;
    }


    @PostConstruct()
    public void init() {
        this.statisticByMonth(10);
    }
}
