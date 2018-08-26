package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Contact;
import com.csg.warehouse.modules.entity.Merchant;
import com.csg.warehouse.modules.mapper.MerchantMapper;
import com.csg.warehouse.modules.service.ContactService;
import com.csg.warehouse.modules.service.MerchantService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * <p>
 * 供应商客户表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class MerchantServiceImpl extends BaseServiceImpl<MerchantMapper, Merchant> implements MerchantService {

    @Autowired
    private ContactService contactService;

    @Override
    public Page<Merchant> selectPage(Page page, Map<String, String> params) {
        page.setRecords(this.baseMapper.findPage(page, params));
        return page;
    }

    @Override
    public void save(Merchant merchant) {
        super.save(merchant);
        contactService.deleteByMerchantId(merchant.getId());
        if (merchant.getContacts().length > 0) {
            for (Contact contact : merchant.getContacts()) {
                contact.setId(null);
                contact.setMerchantId(merchant.getId());
                contactService.insert(contact);
            }
        }
    }

    @Override
    public boolean exist(Merchant merchant, String value) {
        boolean isExist = false;
        if (isValidEntityId(merchant)) {
            Merchant merchantDb = findByCode(value);
            if (merchantDb != null && !merchant.getId().equals(merchantDb.getId())) {
                isExist = true;
            }
        } else {
            Merchant merchantDb = findByCode(value);
            if (merchantDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }

    private Merchant findByCode(String code) {
        if (StringUtils.isNotBlank(code)) {
            Merchant param = new Merchant();
            param.setCode(code);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }
}
