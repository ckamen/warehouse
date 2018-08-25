package com.csg.warehouse.core.interceptor;

import com.csg.warehouse.modules.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class OauthInterceptor implements HandlerInterceptor {

    private static Logger logger = LoggerFactory.getLogger(OauthInterceptor.class);

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse httpServletResponse, Object o) throws Exception {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        /*if (request.getHeader(Constants.AUTHORIZATION) == null) {
            httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        String token = request.getHeader(Constants.AUTHORIZATION);

        try {
            Jws<Claims> jwt = JwtUtils.parseToken(token);
            String username = jwt.getBody().getSubject();
            if (StringUtils.isNoneBlank(username)) {
                User user = userService.findByActiveUsername(username);
                if (user != null) {
                    request.getSession().setAttribute(Constants.LOGIN_USER_ID, user.getId());
                    return true;
                }
            }
        } catch (ExpiredJwtException e) {
            logger.error(e.getMessage());
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        httpServletResponse.sendError(HttpServletResponse.SC_FORBIDDEN);*/
        return true;
    }
}
