package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Rack;
import com.csg.warehouse.modules.service.RackService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 货架表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/rack")
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

    @RequestMapping("/page")
    public WebApiResponse page(Page<Rack> page) {
        page = rackService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Rack rack) {
        rackService.save(rack);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        rackService.deleteById(id);
        return WebApiResponse.success();
    }

}

