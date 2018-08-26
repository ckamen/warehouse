package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.modules.entity.Warehouse;
import com.csg.warehouse.modules.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 仓库表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController extends BaseController {

    @Autowired
    private WarehouseService warehouseService;

    @ModelAttribute("warehouse")
    public Warehouse get(@PathVariable(required = false) Integer id) {
        Warehouse warehouse;
        if (id != null && id > 0) {
            warehouse = warehouseService.selectById(id);
        } else {
            warehouse = new Warehouse();
        }
        return warehouse;
    }

    @GetMapping("/page")
    public WebApiResponse page(Page<Warehouse> page) {
        page = warehouseService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Warehouse warehouse) {
        warehouseService.save(warehouse);
        return WebApiResponse.success(warehouse);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        warehouseService.deleteById(id);
        return WebApiResponse.success();
    }

    @GetMapping("/exist/{id}")
    public WebApiResponse exist(Warehouse warehouse, String value) {
        return WebApiResponse.success(warehouseService.exist(warehouse, value));
    }
}

