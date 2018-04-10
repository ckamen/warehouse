package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Merchant;
import com.csg.warehouse.modules.service.MerchantService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 供应商客户表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/merchant")
public class MerchantController extends BaseController {

    @Autowired
    private MerchantService merchantService;

    @ModelAttribute("merchant")
    public Merchant get(@PathVariable(required = false) Integer id) {
        Merchant merchant;
        if (id != null && id > 0) {
            merchant = merchantService.selectById(id);
        } else {
            merchant = new Merchant();
        }
        return merchant;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<Merchant> page) {
        page = merchantService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Merchant merchant) {
        merchantService.save(merchant);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        merchantService.deleteById(id);
        return WebApiResponse.success();
    }

}

