package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Product;
import com.csg.warehouse.common.service.BaseService;
import com.csg.warehouse.modules.vo.ProductVo;

import java.util.List;
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

    boolean exist(Product product, String value);

    List<String> saveUpload(List<ProductVo> productVoList, Integer userId);

    List<ProductVo> findVoList();
}
