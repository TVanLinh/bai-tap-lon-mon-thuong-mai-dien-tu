package linhtran.it.vnua.sale.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by linhtran on 26/09/17.
 */

@Entity
@Table(name = "order_detail")
public class OrderDetail extends AbstractEntity {

    @Basic()
    @Column(name = "amount")
    private int amount;

    @ManyToOne()
    @JoinColumn(name = "id_product")
    private Product product;


    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_order")
    private Order order;

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
