package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.OrderDetail;
import linhtran.it.vnua.sale.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by linhtran on 04/10/17.
 */

@Service
@Transactional
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public void save(OrderDetail orderDetail) {
        this.orderDetailRepository.save(orderDetail);
    }
}
