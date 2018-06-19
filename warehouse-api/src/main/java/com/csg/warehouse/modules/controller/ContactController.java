package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.Contact;
import com.csg.warehouse.modules.service.ContactService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 联系人表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/contact")
public class ContactController extends BaseController {
    @Autowired
    private ContactService contactService;

    @ModelAttribute("contact")
    public Contact get(@PathVariable(required = false) Integer id) {
        Contact contact;
        if (id != null && id > 0) {
            contact = contactService.selectById(id);
        } else {
            contact = new Contact();
        }
        return contact;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<Contact> page) {
        page = contactService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(Contact contact) {
        contactService.save(contact);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        contactService.deleteById(id);
        return WebApiResponse.success();
    }

}
