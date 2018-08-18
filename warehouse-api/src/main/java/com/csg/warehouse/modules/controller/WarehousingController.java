package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.service.WarehousingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 出库入库记录表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/warehousing")
public class WarehousingController extends BaseController {

    @Autowired
    private WarehousingService warehousingService;

    @ModelAttribute("warehousing")
    public Warehousing get(@PathVariable(required = false) Integer id) {
        Warehousing warehousing;
        if (id != null && id > 0) {
            warehousing = warehousingService.selectById(id);
        } else {
            warehousing = new Warehousing();
        }
        return warehousing;
    }

    @GetMapping("/page")
    public WebApiResponse page(Page<Warehousing> page) {
        page = warehousingService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Warehousing warehousing) {
        warehousingService.save(warehousing);
        return WebApiResponse.success(warehousing);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        warehousingService.deleteById(id);
        return WebApiResponse.success();
    }

}

