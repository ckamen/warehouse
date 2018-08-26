package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Warehouse;
import com.csg.warehouse.common.service.BaseService;

import java.util.Map;

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

    Page<Warehouse> selectPage(Page<Warehouse> page, Map<String, String> params);
}
