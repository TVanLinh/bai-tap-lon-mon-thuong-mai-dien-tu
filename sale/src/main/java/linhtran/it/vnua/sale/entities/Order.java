package linhtran.it.vnua.sale.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**
 * Created by linhtran on 11/10/17.
 */


@Entity
@Table(name = "orders")
@EntityListeners(AuditingEntityListener.class)
public class Order extends AbstractEntity implements Serializable {

    @Basic
    @CreatedDate
    @Column(name = "create_time")
    private Date createTime;


    @Basic
    @Column(name = "status")
    private int status;


    @Basic
    @Column(name = "customer_id")
    private long customerId;

    @Basic
    @Column(name = "employee_id")
    private long employeeId;


    @OneToMany(mappedBy = "order",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<OrderDetail> orderDetails;


    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    public Set<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(Set<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
        for (OrderDetail item : orderDetails) {
            item.setOrder(this);
        }
    }
}
