package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.User;
import com.csg.warehouse.modules.mapper.UserMapper;
import com.csg.warehouse.modules.service.UserService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
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

}
