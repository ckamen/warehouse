package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Merchant;
import com.csg.warehouse.common.service.BaseService;

import java.util.Map;

/**
 * <p>
 * 供应商客户表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface MerchantService extends BaseService<Merchant> {

    Page<Merchant> selectPage(Page page, Map<String, String> params);
}
