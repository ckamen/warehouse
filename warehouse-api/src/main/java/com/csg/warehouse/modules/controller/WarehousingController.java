package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.core.web.WebRequestContext;
import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.service.WarehousingService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * <p>
 * 出库入库记录表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/warehousing")
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
    public WebApiResponse page(Page<Warehousing> page, WebRequestContext requestContext) {
        page = warehousingService.selectPage(page, requestContext.getParams());
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(Warehousing warehousing, HttpSession session) {
        Integer userId = super.getLoginUserId(session);
        warehousingService.save(warehousing, userId);
        return WebApiResponse.success(warehousing);
    }

    @PostMapping("/save-batch")
    public WebApiResponse saveBatch(String jsonStr, HttpSession session) throws IOException {
        Integer userId = super.getLoginUserId(session);
        ObjectMapper mapper = new ObjectMapper();
        List<Warehousing> warehousings = mapper.readValue(jsonStr,
                new TypeReference<List<Warehousing>>() {
                });
        warehousingService.saveBatch(warehousings, userId);
        return WebApiResponse.success(warehousings);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        warehousingService.deleteById(id);
        return WebApiResponse.success();
    }

}

