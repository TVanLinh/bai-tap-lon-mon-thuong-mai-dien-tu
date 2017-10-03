package linhtran.it.vnua.sale.response;

import linhtran.it.vnua.sale.entities.Product;
import linhtran.it.vnua.sale.util.Page;

import java.util.Set;

/**
 * Created by linhtran on 01/10/17.
 */
public class ProductResponse {
    private Page page;
    private Set<Product> productList;

    public ProductResponse(Page page, Set<Product> productList) {
        this.page = page;
        this.productList = productList;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public Set<Product> getProductList() {
        return productList;
    }

    public void setProductList(Set<Product> productList) {
        this.productList = productList;
    }
}
