package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Category;
import com.csg.warehouse.modules.service.CategoryService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 分类表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/category")
public class CategoryController extends BaseController {

    @Autowired
    private CategoryService categoryService;

    @ModelAttribute("category")
    public Category get(@PathVariable(required = false) Integer id) {
        Category category;
        if (id != null && id > 0) {
            category = categoryService.selectById(id);
        } else {
            category = new Category();
        }
        return category;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<Category> page) {
        page = categoryService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Category category) {
        categoryService.save(category);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        categoryService.deleteById(id);
        return WebApiResponse.success();
    }

}
