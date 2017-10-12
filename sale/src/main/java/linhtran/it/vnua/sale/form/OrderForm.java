package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.OrderDetail;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by linhtran on 04/10/17.
 */
public class OrderForm {

    private Set<EngredientForm> engredients;

    private CustomerLoginForm customerLoginForm;

    public Set<EngredientForm> getEngredients() {
        return engredients;
    }

    public void setEngredients(Set<EngredientForm> engredients) {
        this.engredients = engredients;
    }

    public CustomerLoginForm getCustomerLoginForm() {
        return customerLoginForm;
    }

    public void setCustomerLoginForm(CustomerLoginForm customerLoginForm) {
        this.customerLoginForm = customerLoginForm;
    }

    public Set<OrderDetail> toOrderDetail() {
        Set<OrderDetail> orderDetails = new HashSet<>();
        for (EngredientForm engredientForm : this.engredients) {
            orderDetails.add(engredientForm.toOrderDetail());
        }
        return orderDetails;
    }

}
