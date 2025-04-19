``` java
package com.e2e.common.model;

import com.e2e.common.cache.core.EntityCache;
import com.e2e.common.dao.GenericDao;

import java.util.List;

public abstract class BaseEntityModel<T, E, R> {
    // DAO tương ứng
    protected abstract GenericDao<E, Integer> dao();
    // Cache tương ứng
    protected abstract EntityCache<E, Integer> cache();
    // Chuyển Entity -> Thrift object
    protected abstract T toThrift(E entity);
    // Chuyển Thrift object -> Entity
    protected abstract E toEntity(T thriftObj);
    // Tạo result object (nếu cần)
    protected abstract R createResult();

    // CREATE
    public R create(T thriftObj) {
        E entity = toEntity(thriftObj);
        int id = dao().create(entity);
        cache().invalidateAll();
        R result = createResult();
        // ... gán id vào result nếu có ...
        return result;
    }

    // READ all
    public List<T> list() {
        List<E> ents = cache().getAll(() -> dao().list());
        return ents.stream().map(this::toThrift).toList();
    }

    // READ by id
    public T getById(int id) {
        E ent = cache().get(id, () -> dao().getById(id));
        return ent == null ? null : toThrift(ent);
    }

    // UPDATE
    public boolean update(T thriftObj) {
        E entity = toEntity(thriftObj);
        boolean ok = dao().update(entity);
        if (ok) cache().invalidate(entity.getId());
        return ok;
    }

    // DELETE
    public boolean delete(int id) {
        boolean ok = dao().delete(id);
        if (ok) cache().invalidate(id);
        return ok;
    }
}
```


## Example for Model
``` java
package com.e2e.common.model;

import com.e2e.common.dao.ProductDao;
import com.e2e.common.cache.core.EntityCache;
import com.e2e.common.thrift.Product;
import com.e2e.common.thrift.CreateProductResult;
import com.e2e.common.util.ModelUtils;

public class ProductModel extends BaseEntityModel<Product, com.e2e.common.entity.Product, CreateProductResult> {
    public static final ProductModel INSTANCE = new ProductModel();

    @Override
    protected GenericDao<com.e2e.common.entity.Product, Integer> dao() {
        return ProductDao.INSTANCE;
    }

    @Override
    protected EntityCache<com.e2e.common.entity.Product, Integer> cache() {
        return EntityCache.of(com.e2e.common.entity.Product.class);
    }

    @Override
    protected Product toThrift(com.e2e.common.entity.Product entity) {
        return ModelUtils.toThrift(entity);
    }

    @Override
    protected com.e2e.common.entity.Product toEntity(Product thriftObj) {
        return ModelUtils.toEntity(thriftObj);
    }

    @Override
    protected CreateProductResult createResult() {
        return new CreateProductResult();
    }
}
```