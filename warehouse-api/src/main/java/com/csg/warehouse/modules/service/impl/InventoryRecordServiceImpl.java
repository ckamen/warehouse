package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.InventoryRecord;
import com.csg.warehouse.modules.mapper.InventoryRecordMapper;
import com.csg.warehouse.modules.service.InventoryRecordService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 盘点记录表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class InventoryRecordServiceImpl extends BaseServiceImpl<InventoryRecordMapper, InventoryRecord> implements InventoryRecordService {

}
