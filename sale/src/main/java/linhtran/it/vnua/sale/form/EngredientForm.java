package linhtran.it.vnua.sale.form;

import com.fasterxml.jackson.annotation.JsonIgnore;
import linhtran.it.vnua.sale.entities.Customer;
import linhtran.it.vnua.sale.entities.OrderDetail;
import linhtran.it.vnua.sale.entities.Product;
import linhtran.it.vnua.sale.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by linhtran on 04/10/17.
 */

@Component
public class EngredientForm {
    private Product product;
    private int amount;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public OrderDetail toOrderDetail() {
        OrderDetail detail = new OrderDetail();
        detail.setAmount(this.amount);
        detail.setProduct(product);
        return detail;
    }
}
