package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Unit;
import com.csg.warehouse.modules.mapper.UnitMapper;
import com.csg.warehouse.modules.service.UnitService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 计量单位表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class UnitServiceImpl extends BaseServiceImpl<UnitMapper, Unit> implements UnitService {

    @Override
    public boolean exist(Unit unit, String value) {
        boolean isExist = false;
        if (isValidEntityId(unit)) {
            Unit unitDb = findByName(value);
            if (unitDb != null && !unit.getId().equals(unitDb.getId())) {
                isExist = true;
            }
        } else {
            Unit userDb = findByName(value);
            if (userDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }

    private Unit findByName(String name) {
        if (StringUtils.isNotBlank(name)) {
            Unit param = new Unit();
            param.setName(name);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }

}
