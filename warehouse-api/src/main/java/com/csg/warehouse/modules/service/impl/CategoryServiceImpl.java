package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Category;
import com.csg.warehouse.modules.entity.CategoryRelation;
import com.csg.warehouse.modules.mapper.CategoryMapper;
import com.csg.warehouse.modules.service.CategoryRelationService;
import com.csg.warehouse.modules.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @Autowired
    private CategoryRelationService categoryRelationService;

    public void save(Category category) {
        if (isValidId(category)) {
            if (isValidId(category.getParent())) {
                CategoryRelation param = new CategoryRelation();
                param.setChildId(category.getId());
                param.setParentInd(true);
                CategoryRelation parentRelation = categoryRelationService.selectOne(new EntityWrapper<>(param));
                if (isValidId(parentRelation) && parentRelation.getParentId().equals(category.getParent().getId())) {
                } else {
                    categoryRelationService.deleteByChildId(category.getId());
                }
                this.insertRelations(category);
            } else {
                categoryRelationService.deleteByChildId(category.getId());
            }
            this.updateById(category);
        } else {
            this.insert(category);
            this.insertRelations(category);
        }
    }

    private void insertRelations(Category category) {
        if (isValidId(category.getParent())) {
            CategoryRelation param = new CategoryRelation();
            param.setChildId(category.getParent().getId());

            List<CategoryRelation> categoryRelations = categoryRelationService.selectList(new EntityWrapper<>(param));
            for (CategoryRelation cr : categoryRelations) {
                insertRelation(category, cr.getParentId(), false);
            }
            insertRelation(category, category.getParent().getId(), true);
        }
    }

    private void insertRelation(Category category, Integer parentId, boolean isParent) {
        CategoryRelation categoryRelation = new CategoryRelation();
        categoryRelation.setChildId(category.getId());
        categoryRelation.setParentId(parentId);
        categoryRelation.setParentInd(isParent);
        categoryRelationService.insert(categoryRelation);

    }

    @Override
    public Category findWithParent(Integer id) {
        Category category = this.selectById(id);
        if (category != null) {
            category.setParent(this.findParent(category));
        }
        return category;
    }

    @Override
    public Category findParent(Category category) {
        CategoryRelation param = new CategoryRelation();
        param.setChildId(category.getId());
        param.setParentInd(true);
        CategoryRelation parentRelation = categoryRelationService.selectOne(new EntityWrapper<>(param));
        Category parent = null;
        if (parentRelation != null) {
            parent = this.selectById(parentRelation.getParentId());
        }
        return parent;
    }
}
