package com.csg.warehouse.common.service.impl;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.csg.warehouse.common.entity.IdEntity;
import com.csg.warehouse.common.service.BaseService;
import com.csg.warehouse.utils.Reflections;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * @author kamen
 */
public class BaseServiceImpl<M extends BaseMapper<T>, T extends IdEntity> extends ServiceImpl<M, T> implements BaseService<T> {

    @Override
    public void save(T entity, Integer userId) {
        try {
            if (isValidEntityId(entity)) {
                Method setUpdatedBy = Reflections.getAccessibleMethodByName(entity, "setUpdatedBy");
                if (setUpdatedBy != null) {
                    setUpdatedBy.invoke(entity, userId);
                }
                Method setUpdatedTime = Reflections.getAccessibleMethodByName(entity, "setUpdatedTime");
                if (setUpdatedTime != null) {
                    setUpdatedTime.invoke(entity, new Date());
                }
                this.updateById(entity);
            } else {

                Method setCreatedBy = Reflections.getAccessibleMethodByName(entity, "setCreatedBy");
                if (setCreatedBy != null) {
                    setCreatedBy.invoke(entity, userId);
                }
                Method setCreatedTime = Reflections.getAccessibleMethodByName(entity, "setCreatedTime");
                if (setCreatedTime != null) {
                    setCreatedTime.invoke(entity, new Date());
                }

                this.insert(entity);
            }
        } catch (InvocationTargetException | IllegalAccessException e) {
            e.printStackTrace();
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
