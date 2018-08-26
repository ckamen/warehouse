package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.core.web.WebRequestContext;
import com.csg.warehouse.modules.entity.Merchant;
import com.csg.warehouse.modules.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 供应商客户表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/merchant")
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

    @GetMapping("/page")
    public WebApiResponse page(Page<Merchant> page, WebRequestContext webRequestContext) {
        page = merchantService.selectPage(page, webRequestContext.getParams());
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Merchant merchant) {
        merchantService.save(merchant);
        return WebApiResponse.success(merchant);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        merchantService.deleteById(id);
        return WebApiResponse.success();
    }

    @GetMapping("/exist/{id}")
    public WebApiResponse exist(Merchant merchant, String value) {
        return WebApiResponse.success(merchantService.exist(merchant, value));
    }
}

