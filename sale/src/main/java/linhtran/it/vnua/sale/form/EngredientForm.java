package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.OrderDetail;
import linhtran.it.vnua.sale.entities.Product;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

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

    public static EngredientForm getEngredientForm(OrderDetail orderDetail) {
        EngredientForm engredientForm = new EngredientForm();
        engredientForm.setAmount(orderDetail.getAmount());
        engredientForm.setProduct(orderDetail.getProduct());
        return engredientForm;
    }

    public static Set<EngredientForm> getEngredientForms(Set<OrderDetail> orderDetails) {
        Set<EngredientForm> set = new HashSet<>();
        for (OrderDetail orderDetail : orderDetails) {
            set.add(EngredientForm.getEngredientForm(orderDetail));
        }
        return set;
    }
}
