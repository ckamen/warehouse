package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.mapper.Condition;
import com.csg.warehouse.modules.enums.CategoryTypeEnum;
import com.csg.warehouse.modules.entity.Category;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CategoryServiceTest extends BaseTest{

    @Autowired
    CategoryService categoryService;
    @Autowired
    CategoryRelationService categoryRelationService;

    @Test
    public void testSave() {
        Category top = new Category();
        top.setType(CategoryTypeEnum.SUPPLIER.getValue());
        top.setName("一级供应商");
        top.setLevel(0);
        categoryService.save(top, -1);

        Category category2a = new Category();
        category2a.setName("二级供应商a");
        category2a.setType(CategoryTypeEnum.SUPPLIER.getValue());
        category2a.setParent(top);
        category2a.setLevel(top.getLevel()+1);
        categoryService.save(category2a, -1);

        Category category2b = new Category();
        category2b.setName("二级供应商b");
        category2b.setType(CategoryTypeEnum.SUPPLIER.getValue());
        category2b.setParent(top);
        category2b.setLevel(top.getLevel()+1);
        categoryService.save(category2b, -1);

        int count = categoryService.selectCount(new Condition());
        Assert.assertTrue(count == 3);

        Category category3a = new Category();
        category3a.setName("三级供应商a");
        category3a.setType(CategoryTypeEnum.SUPPLIER.getValue());
        category3a.setParent(category2a);
        categoryService.save(category3a, -1);

        int relationCount = categoryRelationService.selectCount(new Condition());
        Assert.assertTrue(relationCount == 5);

        Category category3aP = categoryService.findParent(category3a);
        Assert.assertTrue(category3aP.getName().equals(category2a.getName()));

        category3a.setParent(category2b);
        category3a.setName("三级供应商b");
        categoryService.save(category3a, -1);

        category3a = categoryService.findWithParent(category3a.getId());
        Assert.assertTrue(category3a.getName().equals("三级供应商b"));
        Assert.assertTrue(category3a.getParent().getName().equals(category2b.getName()));

        /*category3a.setParent(null);
        categoryService.save(category3a);

        Assert.assertNull(categoryService.findParent(category3a));*/
    }

}