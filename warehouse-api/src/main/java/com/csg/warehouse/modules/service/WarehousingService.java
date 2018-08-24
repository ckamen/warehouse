package com.csg.warehouse.modules.service;

import com.csg.warehouse.common.service.BaseService;
import com.csg.warehouse.modules.entity.Warehousing;

import java.util.List;

/**
 * <p>
 * 出库入库记录表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface WarehousingService extends BaseService<Warehousing> {

    void saveBatch(List<Warehousing> warehousings);
}
