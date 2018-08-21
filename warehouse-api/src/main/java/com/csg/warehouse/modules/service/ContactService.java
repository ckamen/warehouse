package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Contact;
import com.csg.warehouse.common.service.BaseService;

import java.util.Map;

/**
 * <p>
 * 联系人表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface ContactService extends BaseService<Contact> {

    Page<Contact> selectPage(Page<Contact> page, Map<String, String> params);

    void deleteByMerchantId(int merchantId);
}
