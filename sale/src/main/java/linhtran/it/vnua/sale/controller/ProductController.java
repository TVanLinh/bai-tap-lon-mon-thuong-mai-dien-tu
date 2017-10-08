package linhtran.it.vnua.sale.controller;


import linhtran.it.vnua.sale.entities.Product;
import linhtran.it.vnua.sale.response.ProductResponse;
import linhtran.it.vnua.sale.service.ProductService;
import linhtran.it.vnua.sale.util.Page;
import linhtran.it.vnua.sale.util.PageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

/**
 * Created by linhtran on 20/07/17.
 */

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin("*")
    @GetMapping(value = "product")
    public ResponseEntity<ProductResponse> getProduct(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                      @RequestParam(value = "param", required = false, defaultValue = "") String catalog) {

        int offset = (page - 1) * 3;
        int limit = 3;
        int count;
        Set<Product> products;
        if (catalog.equals("")) {
            products = this.productService.findProduct(offset, limit);
            count = (int) this.productService.getCount();
        } else {
            products = this.productService.findProductByCatalog(catalog, offset, limit);
            count = this.productService.findProductByCatalog(catalog).size();
        }

        Page pageResult = PageUtils.getPage(count, page, 5, 3);
        pageResult.currentPage = page;


        return new ResponseEntity<ProductResponse>(new ProductResponse(pageResult, products), HttpStatus.OK);

    }

    @CrossOrigin("*")
    @GetMapping(value = "product/saleoff")
    public ResponseEntity<ProductResponse> getProductOff() {
        Set<Product> products = this.productService.findProductSaleOff(0, 4);

        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);

    }

    @CrossOrigin("*")
    @GetMapping(value = "product/different")
    public ResponseEntity<ProductResponse> getProductDifferent() {
        Set<Product> products = this.productService.findProduct(0, 8);
        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);

    }

    @CrossOrigin("*")
    @GetMapping(value = "product/{id}")
    public ResponseEntity<Product> findProduct(@PathVariable(value = "id") Long id) {
        Product product = this.productService.find(id);
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

    @CrossOrigin("*")
    @GetMapping(value = "product/productnew")
    public ResponseEntity<ProductResponse> getProductNew() {
        Set<Product> products = this.productService.findProductNew(0, 4);
        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "product/product-sale-hight")
    public ResponseEntity<ProductResponse> getProductSaleHight() {
        Set<Product> products = this.productService.getProductSaleHight(0, 8);
        return new ResponseEntity<ProductResponse>(new ProductResponse(new Page(), products), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "product/search")
    public ResponseEntity<ProductResponse> search(@RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                                  @RequestParam(value = "param", required = false, defaultValue = "") String query) {

        int offset = (page - 1) * 3;
        int limit = 3;
        int count;
        Set<Product> products;

        count = this.productService.findProduct(query).size();
        Page pageResult = PageUtils.getPage(count, page, 5, 3);
        pageResult.currentPage = page;
        products = this.productService.findProduct(query, offset, limit);

        return new ResponseEntity<ProductResponse>(new ProductResponse(pageResult, products), HttpStatus.OK);

    }
}
