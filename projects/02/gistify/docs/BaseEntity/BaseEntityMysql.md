# MySQL Data Access Layer Refactoring

## Overview
This document outlines the standardized approach to refactoring MySQL data access classes to improve code maintainability, reduce duplication, and create a consistent pattern across entity classes.

## Core Components

### 1. BaseEntityMysql
```java
package com.e2e.common.mysql;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.hibernate.exception.JDBCConnectionException;

import com.e2e.common.common.QueryModel;
import com.kido.common.thrift.TPagination;

/**
 * Base class extending BaseMysql with standardized search and count methods
 * @param <T> Entity type
 * @param <K> Entity ID type
 * @param <F> Filter type
 */
public abstract class BaseEntityMysql<T, K, F> extends BaseMysql<T, K> {
    
    public BaseEntityMysql(Class<T> clazz) {
        super(clazz);
    }
    
    /**
     * Perform search for entities based on filter
     */
    public List<T> search(F filter, TPagination pagination) {
        return executeWithRetry("search" + getEntityName(), () -> {
            Map<String, String> orderBys = Collections.singletonMap("id", "DESC");
            List<QueryModel> params = buildQueryParams(filter);
            
            int offset = (pagination != null) ? pagination.getOffset() : 0;
            int limit = (pagination != null && pagination.getCount() > 0) 
                ? pagination.getCount() : Integer.MAX_VALUE;
                
            return list(params, orderBys, offset, limit);
        });
    }
    
    /**
     * Count entities matching the filter criteria
     */
    public int searchCount(F filter) {
        return executeWithRetry("count" + getEntityName(), () -> {
            List<QueryModel> params = buildQueryParams(filter);
            return count(params);
        });
    }
    
    /**
     * Execute a database operation with retry logic
     */
    protected <R> R executeWithRetry(String operation, DbOperation<R> dbOperation) {
        JDBCConnectionException ex = null;
        int retry = 1;

        while (retry++ <= NRETRIES) {
            try {
                return dbOperation.execute();
            } catch (JDBCConnectionException e) {
                logger.error("Error " + operation + " - retry: " + retry, e);
                ex = e;
            }
        }

        throw ex;
    }
    
    /**
     * Build query parameters from filter object
     */
    protected abstract List<QueryModel> buildQueryParams(F filter);
    
    /**
     * Return entity name for logging purposes
     */
    protected abstract String getEntityName();
    
    /**
     * Interface defining a database operation
     */
    protected interface DbOperation<T> {
        T execute();
    }
}
```

### 2. QueryParamBuilder
```java
package com.e2e.common.mysql.query;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.e2e.common.common.QueryModel;

/**
 * Utility for building standardized query parameters
 */
public class QueryParamBuilder {
    private final List<QueryModel> params = new ArrayList<>();
    
    /**
     * Add keyword search for specified fields
     */
    public QueryParamBuilder withKeyword(String keyword, List<FieldCondition> conditions) {
        if (StringUtils.isNotEmpty(keyword)) {
            for (FieldCondition condition : conditions) {
                if (StringUtils.isEmpty(condition.getValue())) {
                    String prefix = params.isEmpty() ? "AND" : "OR";
                    params.add(new QueryModel(prefix, "LIKE", condition.getFieldName(), keyword));
                }
            }
        }
        return this;
    }
    
    /**
     * Add search condition for ID list
     */
    public QueryParamBuilder withIdList(List<?> ids, String fieldName) {
        if (CollectionUtils.isNotEmpty(ids)) {
            params.add(new QueryModel("AND", "IN", fieldName, ids));
        }
        return this;
    }
    
    /**
     * Add search condition for text field
     */
    public QueryParamBuilder withTextField(String value, String fieldName) {
        if (StringUtils.isNotEmpty(value)) {
            params.add(new QueryModel("AND", "LIKE", fieldName, value));
        }
        return this;
    }
    
    /**
     * Add search condition for status field
     */
    public QueryParamBuilder withStatus(Object status, String fieldName) {
        if (status != null) {
            params.add(new QueryModel("AND", "=", fieldName, status));
        }
        return this;
    }
    
    /**
     * Add date range search condition
     */
    public QueryParamBuilder withDateRange(Date fromDate, Date toDate, String fieldName) {
        if (fromDate != null) {
            params.add(new QueryModel("AND", ">=", fieldName, fromDate));
        }
        if (toDate != null) {
            params.add(new QueryModel("AND", "<=", fieldName, toDate));
        }
        return this;
    }
    
    /**
     * Add custom query condition
     */
    public QueryParamBuilder withCustomCondition(String prefix, String operator, String fieldName, Object value) {
        if (value != null) {
            params.add(new QueryModel(prefix, operator, fieldName, value));
        }
        return this;
    }
    
    /**
     * Return the list of query parameters
     */
    public List<QueryModel> build() {
        return params;
    }
    
    /**
     * Class representing a field condition
     */
    public static class FieldCondition {
        private final String fieldName;
        private final String value;
        
        public FieldCondition(String fieldName, String value) {
            this.fieldName = fieldName;
            this.value = value;
        }
        
        public String getFieldName() {
            return fieldName;
        }
        
        public String getValue() {
            return value;
        }
    }
}
```

## Implementation Examples

### ProductSegmentMysql
```java
package com.e2e.common.mysql;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.e2e.common.common.QueryModel;
import com.e2e.common.mysql.entity.ProductSegment;
import com.e2e.common.mysql.query.QueryParamBuilder;
import com.e2e.common.mysql.query.QueryParamBuilder.FieldCondition;
import com.e2e.common.thrift.TProductSegmentFilter;

public class ProductSegmentMysql extends BaseEntityMysql<ProductSegment, Integer, TProductSegmentFilter> {
    public static final ProductSegmentMysql Instance = new ProductSegmentMysql(ProductSegment.class);

    public ProductSegmentMysql(Class<ProductSegment> clazz) {
        super(clazz);
    }

    @Override
    protected List<QueryModel> buildQueryParams(TProductSegmentFilter filter) {
        if (filter == null) {
            return new ArrayList<>();
        }
        
        // Use builder pattern to construct query parameters
        return new QueryParamBuilder()
            .withKeyword(
                filter.getKeyword(), 
                Arrays.asList(
                    new FieldCondition("name", filter.getName()),
                    new FieldCondition("code", filter.getCode()),
                    new FieldCondition("description", filter.getDescription())
                )
            )
            .withIdList(filter.getIds(), "id")
            .withTextField(filter.getCode(), "code")
            .withTextField(filter.getName(), "name")
            .withTextField(filter.getDescription(), "description")
            .withStatus(filter.isSetStatus() ? filter.getStatus().getValue() : null, "status")
            .build();
    }

    @Override
    protected String getEntityName() {
        return "ProductSegment";
    }
}
```

### ProductMysql
```java
package com.e2e.common.mysql;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;

import com.e2e.common.common.QueryModel;
import com.e2e.common.mysql.entity.Product;
import com.e2e.common.mysql.query.QueryParamBuilder;
import com.e2e.common.mysql.query.QueryParamBuilder.FieldCondition;
import com.e2e.common.thrift.TProductFilter;

public class ProductMysql extends BaseEntityMysql<Product, Integer, TProductFilter> {
    public static final ProductMysql Instance = new ProductMysql(Product.class);

    public ProductMysql(Class<Product> clazz) {
        super(clazz);
    }

    @Override
    protected List<QueryModel> buildQueryParams(TProductFilter filter) {
        if (filter == null) {
            return new ArrayList<>();
        }

        QueryParamBuilder builder = new QueryParamBuilder()
            .withKeyword(
                filter.getKeyword(), 
                Arrays.asList(
                    new FieldCondition("sap", filter.getSap()),
                    new FieldCondition("alternativeCode", filter.getAlternativeCode())
                )
            )
            .withTextField(filter.getSap(), "sap")
            .withTextField(filter.getAlternativeCode(), "alternativeCode")
            .withIdList(filter.getCategoryIds(), "categoryId")
            .withIdList(filter.getBrandIds(), "brandId")
            .withIdList(filter.getGroupIds(), "groupId")
            .withIdList(filter.getTypeIds(), "typeId")
            .withIdList(filter.getSegmentIds(), "segmentId")
            .withIdList(filter.getSupplierIds(), "supplierId");
            
        // Handle status if set
        if (filter.isSetStatus()) {
            builder.withStatus(filter.getStatus().getValue(), "status");
        }
            
        // Handle GoodsType if set
        if (filter.isSetGoodsType()) {
            builder.withStatus(filter.getGoodsType().getValue(), "dbGoodsType");
        }
            
        // Handle date range
        if (filter.isSetFromCreatedDate() || filter.isSetToCreatedDate()) {
            Date fromDate = filter.isSetFromCreatedDate() ? new Date(filter.getFromCreatedDate()) : null;
            Date toDate = filter.isSetToCreatedDate() ? new Date(filter.getToCreatedDate()) : null;
            builder.withDateRange(fromDate, toDate, "dbCreatedAt");
        }
            
        // Special handling for regionIds using LIKE pattern
        if (filter.isSetRegionIds() && CollectionUtils.isNotEmpty(filter.getRegionIds())) {
            List<Integer> regionIds = filter.getRegionIds();
            for (int i = 0; i < regionIds.size(); i++) {
                String prefix = i == 0 ? "AND" : "OR";
                builder.withCustomCondition(prefix, "LIKE", "dbRegionIds", "%" + regionIds.get(i) + "%");
            }
        }
            
        return builder.build();
    }

    @Override
    protected String getEntityName() {
        return "Product";
    }
}
```

## Benefits

1. **Reduced Code Duplication**
   - Eliminates identical retry logic in each class
   - Standardizes pagination handling

2. **Improved Readability**
   - QueryParamBuilder uses builder pattern for cleaner code
   - Focused methods with clear responsibilities

3. **Simplified Maintenance**
   - Changes to retry logic or query handling only need to be updated in one place
   - New filter conditions can be added to QueryParamBuilder without modifying existing classes

4. **Increased Consistency**
   - Ensures all entity classes handle queries in the same manner
   - Standardizes error handling and logging

5. **Enhanced Extensibility**
   - Adding support for new query types only requires updating QueryParamBuilder
   - Abstract base class makes it easy to add new entity types
