package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.Product;
import com.csg.warehouse.mapper.ProductMapper;
import com.csg.warehouse.service.ProductService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 商品表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {

}
