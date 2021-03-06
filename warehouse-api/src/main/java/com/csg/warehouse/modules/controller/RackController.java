package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.modules.entity.Rack;
import com.csg.warehouse.modules.service.RackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * <p>
 * 货架表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/rack")
public class RackController extends BaseController {

    @Autowired
    private RackService rackService;

    @ModelAttribute("rack")
    public Rack get(@PathVariable(required = false) Integer id) {
        Rack rack;
        if (id != null && id > 0) {
            rack = rackService.selectById(id);
        } else {
            rack = new Rack();
        }
        return rack;
    }

    @GetMapping("/page")
    public WebApiResponse page(Page<Rack> page) {
        page = rackService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Rack rack, HttpSession session) {
        Integer userId = super.getLoginUserId(session);
        rackService.save(rack, userId);
        return WebApiResponse.success(rack);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        rackService.deleteById(id);
        return WebApiResponse.success();
    }

}

