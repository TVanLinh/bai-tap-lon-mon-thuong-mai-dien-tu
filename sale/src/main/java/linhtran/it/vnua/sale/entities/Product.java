package linhtran.it.vnua.sale.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "product")
@EntityListeners(AuditingEntityListener.class)
public class Product extends AbstractEntity implements Serializable {

    @Basic
    @Column(name = "name")
    private String name;

    @Basic
    @Column(name = "price")
    private Double price;

    @Basic
    @Column(name = "discount")
    private Double discount;

    @Basic
    @Column(name = "description")
    private String description;

    @Basic
    @Column(name = "amount")
    private int amount;

    @Basic
    @Column(name = "image_path")
    private String imagePath;

    @CreatedDate
    @Column(name = "create_date")
    private Date dateCreate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "catalog_code", referencedColumnName = "code")
    private Catalog catalog;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Catalog getCatalog() {
        return catalog;
    }

    public void setCatalog(Catalog catalog) {
        this.catalog = catalog;
    }

    public Date getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(Date dateCreate) {
        this.dateCreate = dateCreate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        if (amount != product.amount) return false;
        if (name != null ? !name.equals(product.name) : product.name != null) return false;
        if (price != null ? !price.equals(product.price) : product.price != null) return false;
        if (discount != null ? !discount.equals(product.discount) : product.discount != null) return false;
        if (description != null ? !description.equals(product.description) : product.description != null) return false;
        if (imagePath != null ? !imagePath.equals(product.imagePath) : product.imagePath != null) return false;
        if (dateCreate != null ? !dateCreate.equals(product.dateCreate) : product.dateCreate != null) return false;
        return catalog != null ? catalog.equals(product.catalog) : product.catalog == null;
    }

    @Override
    public int hashCode() {
        return (int) this.getId();
    }
}
