package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Product;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by linhtran on 14/10/17.
 */
public class ProductForm {

    private long id;
    @NotNull
    private String name;

    @NotNull
    private Double price;

    private Double discount;

    @NotNull
    private String description;

    @NotNull
    private int amount;

    @NotNull
    private String imagePath;

    private Date dateCreate;

    @NotNull
    private CatalogForm catalog;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public Date getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(Date dateCreate) {
        this.dateCreate = dateCreate;
    }

    public CatalogForm getCatalog() {
        return catalog;
    }

    public void setCatalog(CatalogForm catalog) {
        this.catalog = catalog;
    }

    public Product toProduct() {
        Product product = new Product();
        ProductForm productForm = new ProductForm();
        product.setId(this.getId());
        product.setAmount(this.getAmount());
        product.setDateCreate(this.getDateCreate());
        product.setImagePath(this.getImagePath());
        product.setPrice(this.getPrice());
        product.setName(this.getName());
        product.setDescription(this.description);
        product.setDiscount(this.getDiscount());
        product.setCatalog(this.catalog.toCatalog());
        return product;
    }
}
