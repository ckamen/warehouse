package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.Category;
import com.csg.warehouse.modules.mapper.CategoryMapper;
import com.csg.warehouse.modules.service.CategoryService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 分类表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class CategoryServiceImpl extends BaseServiceImpl<CategoryMapper, Category> implements CategoryService {

}
