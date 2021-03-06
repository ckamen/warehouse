package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.core.web.WebRequestContext;
import com.csg.warehouse.modules.entity.Category;
import com.csg.warehouse.modules.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 分类表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/category")
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

    @GetMapping("/page")
    public WebApiResponse page(Page<Category> page, WebRequestContext requestContext) {
        page = categoryService.selectPage(page, requestContext.getParams());
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Category category, HttpSession session) {
        Integer userId = super.getLoginUserId(session);
        categoryService.save(category, userId);
        return WebApiResponse.success(category);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        categoryService.deleteById(id);
        return WebApiResponse.success();
    }

    @GetMapping("/exist/{id}")
    public WebApiResponse exist(Category category, String value) {
        return WebApiResponse.success(categoryService.exist(category, value));
    }
}

