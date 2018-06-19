package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.modules.service.UserService;
import com.csg.warehouse.web.WebApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @ModelAttribute("user")
    public User get(@PathVariable(required = false) Integer id) {
        User user;
        if (id != null && id > 0) {
            user = userService.selectById(id);
        } else {
            user = new User();
        }
        return user;
    }

    @RequestMapping("/page")
    public WebApiResponse page(Page<User> page) {
        page = userService.selectPage(page);
        return WebApiResponse.success(page);
    }

    @RequestMapping("/save/{id}")
    public WebApiResponse save(User user) {
        userService.save(user);
        return WebApiResponse.success();
    }

    @RequestMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        userService.deleteById(id);
        return WebApiResponse.success();
    }

}
