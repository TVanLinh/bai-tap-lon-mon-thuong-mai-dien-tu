package linhtran.it.vnua.sale.controller;

import linhtran.it.vnua.sale.entities.Catalog;
import linhtran.it.vnua.sale.form.CatalogForm;
import linhtran.it.vnua.sale.service.CatalogService;
import linhtran.it.vnua.sale.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

/**
 * Created by linhtran on 13/10/17.
 */

@RestController
@CrossOrigin(value = "*")
@RequestMapping(value = "/catalog")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @CrossOrigin("*")
    @PostMapping(value = "/create")
    public ResponseEntity<String> createCatalog(@Valid @RequestBody CatalogForm catalogForm,
                                                BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }

        if (this.catalogService.findCatalogByCatalogCode(catalogForm.getCode()) != null) {
            return new ResponseEntity<String>(Message.EXIST_ALREADY, HttpStatus.ALREADY_REPORTED);
        }

        this.catalogService.save(catalogForm.toCatalog());
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "/catalogs")
    public ResponseEntity<Set<CatalogForm>> findAll() {
        CatalogForm catalogForm = new CatalogForm();
        return new ResponseEntity<Set<CatalogForm>>(catalogForm.getCatalogsFromCatalogs(this.catalogService.findAll()), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @GetMapping(value = "/search")
    public ResponseEntity<Set<CatalogForm>> find(@RequestParam(value = "query") String query) {
        CatalogForm catalogForm = new CatalogForm();
        return new ResponseEntity<Set<CatalogForm>>(catalogForm.getCatalogsFromCatalogs(this.catalogService.find(query)), HttpStatus.OK);
    }


    @CrossOrigin("*")
    @PutMapping(value = "/update")
    public ResponseEntity<String> update(@Valid @RequestBody CatalogForm catalogForm,
                                         BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }

        Catalog catalog = this.catalogService.findOne(catalogForm.getId());

        if (catalog == null) {
            return new ResponseEntity<String>(Message.NOT_SUCCESS, HttpStatus.BAD_REQUEST);
        }

        this.catalogService.save(catalogForm.toCatalog());
        return new ResponseEntity<String>(Message.OK, HttpStatus.OK);
    }


}
