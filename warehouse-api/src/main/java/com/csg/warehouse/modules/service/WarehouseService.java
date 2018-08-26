package com.csg.warehouse.modules.service;

import com.csg.warehouse.modules.entity.Warehouse;
import com.csg.warehouse.common.service.BaseService;

/**
 * <p>
 * 仓库表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface WarehouseService extends BaseService<Warehouse> {

    boolean exist(Warehouse warehouse, String value);
}
