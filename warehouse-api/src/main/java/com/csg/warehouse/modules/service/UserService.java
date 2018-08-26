package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.common.service.BaseService;

import java.util.Map;

/**
 * <p>
 * 用户表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface UserService extends BaseService<User> {

    User findByActiveUsername(String username, String password);

    User findByActiveUsername(String username);

    Page<User> selectPage(Page<User> page, Map<String, String> params);

    boolean exist(User user, String value);
}
