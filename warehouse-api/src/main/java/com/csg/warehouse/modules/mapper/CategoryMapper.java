package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.csg.warehouse.modules.entity.Category;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 分类表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface CategoryMapper extends BaseMapper<Category> {

    List<Category> findPage(RowBounds rowBounds, Map<String, String > params);

}
