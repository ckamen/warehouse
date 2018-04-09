package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.ProductWarehouse;
import com.csg.warehouse.mapper.ProductWarehouseMapper;
import com.csg.warehouse.service.ProductWarehouseService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 商品仓库关系表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class ProductWarehouseServiceImpl extends ServiceImpl<ProductWarehouseMapper, ProductWarehouse> implements ProductWarehouseService {

}
