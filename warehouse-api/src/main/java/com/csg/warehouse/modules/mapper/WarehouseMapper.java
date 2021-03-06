package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Warehouse;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 仓库表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface WarehouseMapper extends BaseMapper<Warehouse> {

    List<Warehouse> findPage(Page<Warehouse> page, Map<String, String> params);

}
