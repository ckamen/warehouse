package com.csg.warehouse.common.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.csg.warehouse.common.entity.IdEntity;
import com.csg.warehouse.common.service.BaseService;

public class BaseServiceImpl<M extends BaseMapper<T>, T extends IdEntity> extends ServiceImpl<M, T> implements BaseService<T>{

    @Override
    public void save(T entity) {
        if(isValidEntityId(entity)) {
            this.updateById(entity);
        } else {
            this.insert(entity);
        }
    }

    @Override
    public boolean isValidId(Integer id) {
        return id != null && id > 0;
    }

    @Override
    public boolean isValidEntityId(IdEntity idEntity) {
        return idEntity != null && idEntity.getId() != null && idEntity.getId() > 0;
    }
}
