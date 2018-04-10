package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.mapper.WarehousingMapper;
import com.csg.warehouse.modules.service.WarehousingService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 出库入库记录表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class WarehousingServiceImpl extends BaseServiceImpl<WarehousingMapper, Warehousing> implements WarehousingService {

}
