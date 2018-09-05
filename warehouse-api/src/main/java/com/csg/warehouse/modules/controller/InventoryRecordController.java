package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.modules.entity.InventoryRecord;
import com.csg.warehouse.modules.service.InventoryRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 盘点记录表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/inventoryRecord")
public class InventoryRecordController extends BaseController {

    @Autowired
    private InventoryRecordService inventoryRecordService;

    @ModelAttribute("inventoryRecord")
    public InventoryRecord get(@PathVariable(required = false) Integer id) {
        InventoryRecord inventoryRecord;
        if (id != null && id > 0) {
            inventoryRecord = inventoryRecordService.selectById(id);
        } else {
            inventoryRecord = new InventoryRecord();
        }
        return inventoryRecord;
    }

    @GetMapping("/page")
    public WebApiResponse page(Page<InventoryRecord> page) {
        page = inventoryRecordService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(InventoryRecord inventoryRecord, HttpSession session) {
        Integer userId = super.getLoginUserId(session);
        inventoryRecordService.save(inventoryRecord, userId);
        return WebApiResponse.success();
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        inventoryRecordService.deleteById(id);
        return WebApiResponse.success();
    }

}

