package com.e2e.common.model;

import com.e2e.common.cache.ProductCache;
import com.e2e.common.mysql.ProductMysql;
import com.e2e.common.entity.Product;

public class ProductModel extends BaseModel<Product, Integer> {
    
    public static final ProductModel INSTANCE = new ProductModel();
    
    private ProductModel() {
        // Private constructor for singleton
    }
    
    @Override
    protected ProductMysql getMysqlHandler() {
        return ProductMysql.Instance;
    }
    
    @Override
    protected ProductCache getCacheHandler() {
        return ProductCache.Instance;
    }
    
    @Override
    protected String getModelName() {
        return "Product";
    }
    
    @Override
    protected Integer extractId(Product entity) {
        return entity.getId();
    }
    
    // Only implement product-specific methods here
    // All common CRUD operations are inherited
}