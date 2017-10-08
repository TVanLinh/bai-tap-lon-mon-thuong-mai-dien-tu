package linhtran.it.vnua.sale.entities;

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

    @Column(name = "id_order")
    private  Long  idOrder;

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

    public Long getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(Long idOrder) {
        this.idOrder = idOrder;
    }
}
