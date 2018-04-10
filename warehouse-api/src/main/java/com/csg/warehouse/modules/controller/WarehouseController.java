package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Warehouse;
import com.csg.warehouse.modules.service.WarehouseService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 仓库表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/warehouse")
public class WarehouseController extends BaseController {

    @Autowired
    private WarehouseService warehouseService;

    @ModelAttribute("unit")
    public Warehouse get(@PathVariable(required = false) Integer id) {
        Warehouse warehouse;
        if (id != null && id > 0) {
            warehouse = warehouseService.selectById(id);
        } else {
            warehouse = new Warehouse();
        }
        return warehouse;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<Warehouse> page) {
        page = warehouseService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Warehouse warehouse) {
        warehouseService.save(warehouse);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        warehouseService.deleteById(id);
        return WebApiResponse.success();
    }

}

