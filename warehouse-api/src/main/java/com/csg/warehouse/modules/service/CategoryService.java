package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Category;
import com.csg.warehouse.common.service.BaseService;

import java.util.Map;

/**
 * <p>
 * 分类表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface CategoryService extends BaseService<Category> {

    Page<Category> selectPage(Page<Category> page, Map<String, String> params);

    Category findWithParent(Integer id);

    Category findParent(Category category);

    boolean exist(Category category, String value);
}
