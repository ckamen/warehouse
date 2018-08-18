package com.csg.warehouse.core.interceptor;

import com.csg.warehouse.modules.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class OauthInterceptor implements HandlerInterceptor {

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse httpServletResponse, Object o) throws Exception {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        /*if (request.getHeader("Authorization") == null) {
            httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        String token = request.getHeader("Authorization");
        User user = userService.findByLoginToken(token);
        if (user == null) {
            httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }*/
        return true;
    }
}
