package linhtran.it.vnua.sale;

import linhtran.it.vnua.sale.service.OrderDetailService;
import linhtran.it.vnua.sale.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaAuditing
@EnableJpaRepositories
@ComponentScan
public class SaleApplication {
//    @Autowired
//    private OrderDetailService orderDetailService;
    public static void main(String[] args) {
        SpringApplication.run(SaleApplication.class, args);
    }
}
