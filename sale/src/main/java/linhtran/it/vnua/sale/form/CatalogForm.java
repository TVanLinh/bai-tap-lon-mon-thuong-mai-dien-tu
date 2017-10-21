package linhtran.it.vnua.sale.form;

import linhtran.it.vnua.sale.entities.Catalog;

import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by linhtran on 13/10/17.
 */
public class CatalogForm {

    private long id;

    @NotNull
    private String name;

    @NotNull
    private String code;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Catalog toCatalog() {
        Catalog catalog = new Catalog();
        catalog.setId(this.id);
        catalog.setCatalogCode(this.code);
        catalog.setName(this.name);
        return catalog;
    }

    public CatalogForm getCatalogFromFromCatalog(Catalog catalog) {
        CatalogForm catalogForm = new CatalogForm();
        catalogForm.setId(catalog.getId());
        catalogForm.setCode(catalog.getCatalogCode());
        catalogForm.setName(catalog.getName());
        return catalogForm;
    }

    public Set<CatalogForm> getCatalogsFromCatalogs(Set<Catalog> catalogs) {
        Set<CatalogForm> catalogForms = new HashSet<>();
        for (Catalog catalog : catalogs) {
            catalogForms.add(this.getCatalogFromFromCatalog(catalog));
        }
        return catalogForms;
    }
}
