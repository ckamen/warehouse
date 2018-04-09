package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.Category;
import com.csg.warehouse.mapper.CategoryMapper;
import com.csg.warehouse.service.CategoryService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 分类表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements CategoryService {

}
