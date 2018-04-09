package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.Warehousing;
import com.csg.warehouse.mapper.WarehousingMapper;
import com.csg.warehouse.service.WarehousingService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 出库入库记录表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class WarehousingServiceImpl extends ServiceImpl<WarehousingMapper, Warehousing> implements WarehousingService {

}
