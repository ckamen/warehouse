package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Product;
import com.csg.warehouse.modules.vo.ProductVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 商品表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface ProductMapper extends BaseMapper<Product> {

    List<Product> findPage(Page page, Map<String, String> params);

    List<ProductVo> findVoList();

    List<ProductVo> findWarningInventory();
}
