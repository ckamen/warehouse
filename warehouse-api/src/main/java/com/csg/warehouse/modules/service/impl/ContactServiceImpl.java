package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Contact;
import com.csg.warehouse.modules.mapper.ContactMapper;
import com.csg.warehouse.modules.service.ContactService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 联系人表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class ContactServiceImpl extends BaseServiceImpl<ContactMapper, Contact> implements ContactService {

    @Override
    public Page<Contact> selectPage(Page<Contact> page, Map<String, String> params) {
        List<Contact> contacts = this.baseMapper.findPage(page, params);

        page.setRecords(contacts);
        return page;
    }

    public void deleteByMerchantId(int merchantId) {
        this.baseMapper.deleteByMerchantId(merchantId);
    }

}
