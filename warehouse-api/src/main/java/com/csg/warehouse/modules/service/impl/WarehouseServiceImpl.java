package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Warehouse;
import com.csg.warehouse.modules.mapper.WarehouseMapper;
import com.csg.warehouse.modules.service.WarehouseService;
import com.csg.warehouse.utils.StringUtils;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 仓库表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class WarehouseServiceImpl extends BaseServiceImpl<WarehouseMapper, Warehouse> implements WarehouseService {

    @Override
    public boolean exist(Warehouse warehouse, String value) {
        boolean isExist = false;
        if (isValidEntityId(warehouse)) {
            Warehouse warehouseDb = findByCode(value);
            if (warehouseDb != null && !warehouse.getId().equals(warehouseDb.getId())) {
                isExist = true;
            }
        } else {
            Warehouse warehouseDb = findByCode(value);
            if (warehouseDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }

    private Warehouse findByCode(String code) {
        if (StringUtils.isNotBlank(code)) {
            Warehouse param = new Warehouse();
            param.setCode(code);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }

}
