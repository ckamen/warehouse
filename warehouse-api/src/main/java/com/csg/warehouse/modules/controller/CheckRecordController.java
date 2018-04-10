package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Unit;
import com.csg.warehouse.modules.service.UnitService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 盘点记录表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/checkRecord")
public class CheckRecordController extends BaseController {

    @Autowired
    private UnitService unitService;

    @ModelAttribute("unit")
    public Unit get(@PathVariable(required = false) Integer id) {
        Unit unit;
        if (id != null && id > 0) {
            unit = unitService.selectById(id);
        } else {
            unit = new Unit();
        }
        return unit;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<Unit> page) {
        page = unitService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Unit unit) {
        unitService.save(unit);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        unitService.deleteById(id);
        return WebApiResponse.success();
    }

}

