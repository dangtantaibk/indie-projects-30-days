package com.e2e.common.model;

import com.e2e.common.cache.BaseCache;
import com.e2e.common.mysql.BaseMysql;
import java.util.List;

/**
 * Generic base model providing common CRUD operations
 * @param <T> The entity type
 * @param <ID> The ID type (usually Integer or Long)
 */
public abstract class BaseModel<T, ID> {
    
    // Abstract methods to be implemented by child classes
    protected abstract BaseMysql<T, ID> getMysqlHandler();
    protected abstract BaseCache<T, ID> getCacheHandler();
    protected abstract String getModelName();
    
    /**
     * Get entity by ID, with caching
     */
    public T getById(ID id) {
        if (id == null) {
            return null;
        }
        
        // Try to get from cache first
        T result = getCacheHandler().get(id);
        if (result != null) {
            return result;
        }
        
        // If not in cache, get from database
        result = getMysqlHandler().getById(id);
        
        // Store in cache if found
        if (result != null) {
            getCacheHandler().put(id, result);
        }
        
        return result;
    }
    
    /**
     * Delete entity by ID
     */
    public boolean deleteById(ID id) {
        if (id == null) {
            return false;
        }
        
        // Delete from database
        boolean success = getMysqlHandler().deleteById(id);
        
        // If successful, remove from cache
        if (success) {
            getCacheHandler().remove(id);
        }
        
        return success;
    }
    
    /**
     * Create new entity
     */
    public T create(T entity) {
        if (entity == null) {
            return null;
        }
        
        // Create in database
        T created = getMysqlHandler().create(entity);
        
        // If successful, add to cache
        if (created != null) {
            ID id = extractId(created);
            if (id != null) {
                getCacheHandler().put(id, created);
            }
        }
        
        return created;
    }
    
    /**
     * Update existing entity
     */
    public T update(T entity) {
        if (entity == null) {
            return null;
        }
        
        // Update in database
        T updated = getMysqlHandler().update(entity);
        
        // If successful, update cache
        if (updated != null) {
            ID id = extractId(updated);
            if (id != null) {
                getCacheHandler().put(id, updated);
            }
        }
        
        return updated;
    }
    
    /**
     * Search entities by filter
     */
    public List<T> search(Object filter) {
        return getMysqlHandler().search(filter);
    }
    
    /**
     * Extract ID from entity
     * This needs to be implemented by child classes
     */
    protected abstract ID extractId(T entity);
}