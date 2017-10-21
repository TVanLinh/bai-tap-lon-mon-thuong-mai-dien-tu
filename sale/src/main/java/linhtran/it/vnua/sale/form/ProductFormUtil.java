package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Product;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by linhtran on 14/10/17.
 */
public class ProductFormUtil {

    public static ProductForm getProductFormFromProduct(Product product) {
        ProductForm productForm = new ProductForm();
        productForm.setId(product.getId());
        productForm.setAmount(product.getAmount());
        productForm.setDateCreate(product.getDateCreate());
        productForm.setImagePath(product.getImagePath());
        productForm.setPrice(product.getPrice());
        productForm.setName(product.getName());
        productForm.setDiscount(product.getDiscount());
        productForm.setDescription(product.getDescription());
        productForm.setCatalog(CatalogFormUtil.getCatalogFromFromCatalog(product.getCatalog()));
        return productForm;
    }


    public static Set<ProductForm> getProductFormsFromProducts(Set<Product> products) {
        Set<ProductForm> productForms = new HashSet<ProductForm>();
        for (Product product : products) {
            productForms.add(ProductFormUtil.getProductFormFromProduct(product));
        }
        return productForms;
    }
}
