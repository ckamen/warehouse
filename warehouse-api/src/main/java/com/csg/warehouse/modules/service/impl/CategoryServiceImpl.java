package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Category;
import com.csg.warehouse.modules.entity.CategoryRelation;
import com.csg.warehouse.modules.mapper.CategoryMapper;
import com.csg.warehouse.modules.service.CategoryRelationService;
import com.csg.warehouse.modules.service.CategoryService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
        if (isValidEntityId(category)) {
            if (isValidEntityId(category.getParent())) {
                CategoryRelation param = new CategoryRelation();
                param.setChildId(category.getId());
                param.setParentInd(true);
                CategoryRelation parentRelation = categoryRelationService.selectOne(new EntityWrapper<>(param));
                if (isValidEntityId(parentRelation) && parentRelation.getParentId().equals(category.getParent().getId())) {
                } else {
                    categoryRelationService.deleteByChildId(category.getId());
                }
                this.insertRelations(category);
            } else {
                if(category.getParent().getLevel() > 0) {
                    categoryRelationService.deleteByChildId(category.getId());
                }
            }
            this.updateById(category);
        } else {
            this.insert(category);
            this.insertRelations(category);
        }
    }

    private void insertRelations(Category category) {
        if (isValidEntityId(category.getParent())) {
            CategoryRelation param = new CategoryRelation();
            param.setChildId(category.getParent().getId());

            int level = category.getParent().getLevel() + 1;
            List<CategoryRelation> categoryRelations = categoryRelationService.selectList(new EntityWrapper<>(param));
            for (CategoryRelation cr : categoryRelations) {
                if (cr.getParentId() > 0) {
                    insertRelation(category, cr.getParentId(), false, level);
                }
            }
            insertRelation(category, category.getParent().getId(), true, level);
        } else {
            insertRelation(category, -1, true, 0);
        }
    }

    private void insertRelation(Category category, Integer parentId, boolean isParent, int level) {
        CategoryRelation categoryRelation = new CategoryRelation();
        categoryRelation.setChildId(category.getId());
        categoryRelation.setParentId(parentId);
        categoryRelation.setParentInd(isParent);
        categoryRelation.setLevel(level);
        categoryRelationService.insert(categoryRelation);

    }

    @Override
    public Page<Category> selectPage(Page<Category> page, Map<String, String> params) {
        List<Category> records = this.baseMapper.findPage(page, params);
        if (CollectionUtils.isNotEmpty(records)) {
            for (Category cat : records) {
                cat.setParent(findParent(cat));
            }
        }
        page.setRecords(records);
        return page;
    }

    @Override
    public Category findWithParent(Integer id) {
        Category category = this.selectById(id);
        if (category != null) {
            category.setParent(this.findParent(category));
            if (category.getParent() != null) {
                category.setLevel(category.getParent().getLevel() + 1);
            } else {
                category.setLevel(1);
            }
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
            if (parent != null) {
                parent.setLevel(parentRelation.getLevel());
            }
        }
        return parent;
    }

    @Override
    public boolean exist(Category category, String value) {
        boolean isExist = false;
        if (isValidEntityId(category)) {
            Category categoryDb = findByCode(value);
            if (categoryDb != null && !category.getId().equals(categoryDb.getId())) {
                isExist = true;
            }
        } else {
            Category categoryDb = findByCode(value);
            if (categoryDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }

    private Category findByCode(String code) {
        if (StringUtils.isNotBlank(code)) {
            Category param = new Category();
            param.setCode(code);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }
}
