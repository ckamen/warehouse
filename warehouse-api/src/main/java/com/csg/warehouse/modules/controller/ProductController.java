package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Product;
import com.csg.warehouse.modules.service.ProductService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 商品表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/product")
public class ProductController extends BaseController {

    @Autowired
    private ProductService productService;

    @ModelAttribute("product")
    public Product get(@PathVariable(required = false) Integer id) {
        Product product;
        if (id != null && id > 0) {
            product = productService.selectById(id);
        } else {
            product = new Product();
        }
        return product;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<Product> page) {
        page = productService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Product product) {
        productService.save(product);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        productService.deleteById(id);
        return WebApiResponse.success();
    }

}

