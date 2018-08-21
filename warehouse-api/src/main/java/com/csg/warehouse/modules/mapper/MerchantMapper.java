package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.csg.warehouse.modules.entity.Merchant;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 供应商客户表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface MerchantMapper extends BaseMapper<Merchant> {

    List<Merchant> findPage(RowBounds rowBounds, Map<String, String > params);

}
