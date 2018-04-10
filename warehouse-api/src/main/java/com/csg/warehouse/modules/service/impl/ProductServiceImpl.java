package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.Product;
import com.csg.warehouse.modules.mapper.ProductMapper;
import com.csg.warehouse.modules.service.ProductService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 商品表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class ProductServiceImpl extends BaseServiceImpl<ProductMapper, Product> implements ProductService {

}
