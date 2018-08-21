package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.csg.warehouse.modules.entity.Contact;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 联系人表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface ContactMapper extends BaseMapper<Contact> {

    List<Contact> findPage(RowBounds rowBounds, Map<String, String > params);

    void deleteByMerchantId(@Param("merchantId") int merchantId);

}
