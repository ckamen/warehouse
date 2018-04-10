package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.CategoryRelation;
import com.csg.warehouse.modules.mapper.CategoryRelationMapper;
import com.csg.warehouse.modules.service.CategoryRelationService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 分类关系表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class CategoryRelationServiceImpl extends BaseServiceImpl<CategoryRelationMapper, CategoryRelation> implements CategoryRelationService {

    @Override
    public void deleteByChildId(Integer childId) {
        CategoryRelation param = new CategoryRelation();
        param.setChildId(childId);
        delete(new EntityWrapper<>(param));
    }
}
