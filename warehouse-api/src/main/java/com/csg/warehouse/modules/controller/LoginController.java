package com.csg.warehouse.modules.controller;

import com.csg.warehouse.common.controller.BaseController;
import com.csg.warehouse.core.web.WebApiResponse;
import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.modules.service.UserService;
import com.csg.warehouse.utils.JwtUtils;
import com.csg.warehouse.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/")
public class LoginController extends BaseController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/login")
    public WebApiResponse<ApiData> login(String username, String password, HttpServletResponse response) throws IOException {
        User user = userService.findByActiveUsername(username, password);
        if (StringUtils.isBlank(username) || user == null) {
            return WebApiResponse.error("用户名或者密码不正确");
        } else {
            String token = JwtUtils.getToken(username);
            user.setLastAccessTime(new Date());
            userService.save(user);
            ApiData apiData = new ApiData();
            apiData.token = token;
            return WebApiResponse.success(apiData);
        }
    }


    @PostMapping(value = "/logout")
    public WebApiResponse logout(String token) {
        logger.debug("token: " + token);
        return WebApiResponse.success();
    }

    public static class ApiData {
        public String token = "";
    }

}
