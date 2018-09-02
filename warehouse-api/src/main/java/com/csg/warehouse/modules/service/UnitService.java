package com.csg.warehouse.modules.service;

import com.csg.warehouse.modules.entity.Unit;
import com.csg.warehouse.common.service.BaseService;

/**
 * <p>
 * 计量单位表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface UnitService extends BaseService<Unit> {

    boolean exist(Unit unit, String value);

    Unit findByName(String name);
}
