package com.csg.warehouse.modules.controller;

import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.service.ProductService;
import com.csg.warehouse.modules.vo.ProductVo;
import com.csg.warehouse.utils.DateUtils;
import com.csg.warehouse.utils.excel.ExportExcel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Controller
@RequestMapping("/export")
public class ExportController extends BaseController {

    @Autowired
    private ProductService productService;

    @RequestMapping("/product")
    public void exportProduct(HttpServletResponse response) throws IOException {
        ExportExcel ee = new ExportExcel("商品列表", ProductVo.class);
        ee.setDataList(productService.findVoList());
        String fileName = "商品库存列表-" + DateUtils.format(new Date(), "yyyyMMddHHmm") + ".xlsx";
        ee.write(response, fileName);
    }
}

