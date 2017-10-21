package linhtran.it.vnua.sale.service;

import linhtran.it.vnua.sale.entities.Catalog;
import linhtran.it.vnua.sale.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by linhtran on 13/10/17.
 */

@Service
@Transactional
public class CatalogService {
    @Autowired
    private CatalogRepository catalogRepository;

    public void save(Catalog catalog) {
        this.catalogRepository.save(catalog);
    }

    public Catalog findOne(long id) {
        return this.catalogRepository.findOne(id);
    }

    public Set<Catalog> findAll() {
        Set<Catalog> catalogs = new HashSet<Catalog>();
        for (Catalog catalog : this.catalogRepository.findAll()) {
            catalogs.add(catalog);
        }
        return catalogs;
    }

    public Catalog findCatalogByCatalogCode(String code) {
        return this.catalogRepository.findCatalogByCatalogCode(code);
    }

    public Set<Catalog> find(String query) {
        return this.catalogRepository.find(query);
    }
}
