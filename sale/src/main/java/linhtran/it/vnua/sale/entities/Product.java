package linhtran.it.vnua.sale.entities;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "product")
public class Product extends AbstractEntity implements Serializable{

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

    @ManyToOne()
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

}
