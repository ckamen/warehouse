package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.core.web.WebRequestContext;
import com.csg.warehouse.modules.entity.Product;
import com.csg.warehouse.modules.service.ProductService;
import com.csg.warehouse.modules.vo.ProductVo;
import com.csg.warehouse.utils.excel.ImportExcel;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * <p>
 * 商品表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/product")
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

    @GetMapping("/page")
    public WebApiResponse page(Page<Product> page, WebRequestContext requestContext) {
        page = productService.selectPage(page, requestContext.getParams());
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Product product) {
        productService.save(product);
        return WebApiResponse.success(product);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        productService.deleteById(id);
        return WebApiResponse.success();
    }

    @GetMapping("/exist/{id}")
    public WebApiResponse exist(Product product, String value) {
        return WebApiResponse.success(productService.exist(product, value));
    }

    @RequestMapping("upload")
    public WebApiResponse upload(MultipartFile file) throws IOException, InvalidFormatException, IllegalAccessException, InstantiationException {
        ImportExcel ie = new ImportExcel(file, 0, 0);
        List<ProductVo> productVoList = ie.getDataList(ProductVo.class);
        List<String> messages = productService.saveUpload(productVoList);
        return WebApiResponse.success(messages);
    }



}

