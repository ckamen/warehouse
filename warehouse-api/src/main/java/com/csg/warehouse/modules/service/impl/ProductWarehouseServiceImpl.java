package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.ProductWarehouse;
import com.csg.warehouse.modules.mapper.ProductWarehouseMapper;
import com.csg.warehouse.modules.service.ProductWarehouseService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 商品仓库关系表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class ProductWarehouseServiceImpl extends BaseServiceImpl<ProductWarehouseMapper, ProductWarehouse> implements ProductWarehouseService {

}
