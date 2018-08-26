package com.csg.warehouse.modules.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.core.web.WebRequestContext;
import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.modules.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@RestController
@RequestMapping("/api/user")
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

    @GetMapping("/page")
    public WebApiResponse page(Page<User> page, WebRequestContext requestContext) {
        page = userService.selectPage(page, requestContext.getParams());
        return WebApiResponse.success(page);
    }

    @PostMapping("/save/{id}")
    public WebApiResponse save(User user) {
        userService.save(user);
        return WebApiResponse.success(user);
    }

    @DeleteMapping("/delete/{id}")
    public WebApiResponse delete(@PathVariable Integer id) {
        userService.deleteById(id);
        return WebApiResponse.success();
    }

    @GetMapping("/exist/{id}")
    public WebApiResponse exist(User user, String value) {
        return WebApiResponse.success(userService.exist(user, value));
    }

}

