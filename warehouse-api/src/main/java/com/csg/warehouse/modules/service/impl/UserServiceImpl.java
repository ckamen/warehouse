package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.modules.mapper.UserMapper;
import com.csg.warehouse.modules.service.UserService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<UserMapper, User> implements UserService {

    @Override
    public User findByActiveUsername(String username, String password) {
        User param = new User();
        param.setUsername(username);
        param.setPassword(password);
        param.setActive(1);
        return this.selectOne(new EntityWrapper<>(param));
    }

    @Override
    public User findByActiveUsername(String username) {
        User param = new User();
        param.setUsername(username);
        param.setActive(1);
        User user = this.selectOne(new EntityWrapper<>(param));
        return user;
    }

}
