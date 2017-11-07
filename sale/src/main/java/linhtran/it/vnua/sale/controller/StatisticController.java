package linhtran.it.vnua.sale.controller;

import linhtran.it.vnua.sale.form.StatisticForm;
import linhtran.it.vnua.sale.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by linhtran on 08/11/17.
 */

@RestController
public class StatisticController {

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping("admin/statistic/{time}/{type}")
    public ResponseEntity<Collection<StatisticForm>> statisticByMonth(@PathVariable(value = "time") long time,
                                                                      @PathVariable(value = "type") int type) {
        Date date = new Date(time);

        Collection<StatisticForm> collection = new ArrayList<>();
        if (type == 0) {
            collection = this.orderDetailService.statisticByDay(date);
        } else if (type == 1) {
            collection = this.orderDetailService.statisticByMonth(date);
        } else if (type == 2) {
            collection = this.orderDetailService.statisticByYear(date);
        }

        return new ResponseEntity<Collection<StatisticForm>>(collection, HttpStatus.OK);
    }

}
