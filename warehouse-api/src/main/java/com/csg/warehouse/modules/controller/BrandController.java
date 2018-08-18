package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Brand;
import com.csg.warehouse.modules.service.BrandService;
import com.csg.warehouse.core.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 品牌表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/api/brand")
public class BrandController extends BaseController {

    @Autowired
    private BrandService brandService;

    @ModelAttribute("brand")
    public Brand get(@PathVariable(required = false) Integer id) {
        Brand brand;
        if (id != null && id > 0) {
            brand = brandService.selectById(id);
        } else {
            brand = new Brand();
        }
        return brand;
    }

    @GetMapping("/page")
    public WebApiResponse page(Page<Brand> page) {
        page = brandService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Brand brand) {
        brandService.save(brand);
        return WebApiResponse.success(brand);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        brandService.deleteById(id);
        return WebApiResponse.success();
    }
}

