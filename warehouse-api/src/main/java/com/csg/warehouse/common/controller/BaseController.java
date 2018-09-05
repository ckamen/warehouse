package com.csg.warehouse.common.controller;

import com.csg.warehouse.common.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class BaseController {

    protected static Logger logger = LoggerFactory.getLogger(BaseController.class);


    protected Integer getLoginUserId(HttpSession session) {
        return  (Integer)session.getAttribute(Constants.LOGIN_USER_ID);
    }

    protected Integer getLoginUserId(HttpServletRequest request) {
        return getLoginUserId(request.getSession());
    }
}
