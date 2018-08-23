package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Product;
import com.csg.warehouse.common.service.BaseService;

import java.util.Map;

/**
 * <p>
 * 商品表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface ProductService extends BaseService<Product> {

    Page<Product> selectPage(Page<Product> page, Map<String, String> params);
}
