package com.csg.warehouse.modules.service;

import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.common.service.BaseService;

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

    boolean exist(User user, String value);
}
