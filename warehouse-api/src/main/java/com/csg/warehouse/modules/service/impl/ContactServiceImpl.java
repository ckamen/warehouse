package com.csg.warehouse.modules.service.impl;

import com.csg.warehouse.modules.entity.Contact;
import com.csg.warehouse.modules.mapper.ContactMapper;
import com.csg.warehouse.modules.service.ContactService;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

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

}
