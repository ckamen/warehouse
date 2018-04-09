package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.User;
import com.csg.warehouse.mapper.UserMapper;
import com.csg.warehouse.service.UserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
