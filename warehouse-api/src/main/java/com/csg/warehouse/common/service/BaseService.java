package com.csg.warehouse.common.service;

import com.baomidou.mybatisplus.service.IService;
import com.csg.warehouse.common.entity.IdEntity;

public interface BaseService<T extends IdEntity> extends IService<T> {

    void save(T t);

    boolean isValidId(IdEntity idEntity);
}
