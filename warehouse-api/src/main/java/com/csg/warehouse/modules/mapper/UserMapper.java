package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.User;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 用户表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface UserMapper extends BaseMapper<User> {

    List<User> findPage(Page<User> page, Map<String, String> params);

}
