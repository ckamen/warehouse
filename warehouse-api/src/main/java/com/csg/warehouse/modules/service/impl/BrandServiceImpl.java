package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.Brand;
import com.csg.warehouse.modules.mapper.BrandMapper;
import com.csg.warehouse.modules.service.BrandService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 品牌表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class BrandServiceImpl extends BaseServiceImpl<BrandMapper, Brand> implements BrandService {

    @Override
    public boolean exist(Brand brand, String value) {
        boolean isExist = false;
        if (isValidEntityId(brand)) {
            Brand brandDb = findByCode(value);
            if (brandDb != null && !brand.getId().equals(brandDb.getId())) {
                isExist = true;
            }
        } else {
            Brand brandDb = findByCode(value);
            if (brandDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }

    private Brand findByCode(String code) {
        if (StringUtils.isNotBlank(code)) {
            Brand param = new Brand();
            param.setCode(code);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }

}
