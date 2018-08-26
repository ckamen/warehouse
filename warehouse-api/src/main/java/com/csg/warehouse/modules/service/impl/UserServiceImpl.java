package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.modules.mapper.UserMapper;
import com.csg.warehouse.modules.service.UserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

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
        return this.selectOne(new EntityWrapper<>(param));
    }

    private User findByUsername(String username) {
        if (StringUtils.isNotBlank(username)) {
            User param = new User();
            param.setUsername(username);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }

    @Override
    public Page<User> selectPage(Page<User> page, Map<String, String> params) {
        page.setRecords(this.baseMapper.findPage(page, params));
        return page;
    }

    @Override
    public boolean exist(User user, String value) {
        boolean isExist = false;
        if (isValidEntityId(user)) {
            User userDb = findByUsername(value);
            if (userDb != null && !user.getId().equals(userDb.getId())) {
                isExist = true;
            }
        } else {
            User userDb = findByUsername(value);
            if (userDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }
}
