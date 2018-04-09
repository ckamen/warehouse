package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.Contact;
import com.csg.warehouse.mapper.ContactMapper;
import com.csg.warehouse.service.ContactService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 联系人表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class ContactServiceImpl extends ServiceImpl<ContactMapper, Contact> implements ContactService {

}
