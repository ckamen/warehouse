package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.ProductWarehouse;
import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.enums.WarehouseActionEnum;
import com.csg.warehouse.modules.mapper.WarehousingMapper;
import com.csg.warehouse.modules.service.ProductWarehouseService;
import com.csg.warehouse.modules.service.WarehousingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 * 出库入库记录表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class WarehousingServiceImpl extends BaseServiceImpl<WarehousingMapper, Warehousing> implements WarehousingService {

    @Autowired
    private ProductWarehouseService productWarehouseService;

    @Override
    @Transactional
    public void saveBatch(List<Warehousing> warehousings) {
        if (warehousings != null && warehousings.size() > 0) {
            for (Warehousing wh : warehousings) {
                if (isValidId(wh.getProductId())) {
                    super.save(wh);

                    ProductWarehouse param = new ProductWarehouse();
                    param.setWarehouseId(wh.getWarehouseId());
                    param.setProductId(wh.getProductId());
                    ProductWarehouse pw = productWarehouseService.selectOne(new EntityWrapper<>(param));
                    if (wh.getAction() == WarehouseActionEnum.IN.getValue()) {
                        pw.setInventory(pw.getInventory() + wh.getQuantity());
                    } else {
                        pw.setInventory(pw.getInventory() - wh.getQuantity());
                    }

                    productWarehouseService.save(pw);
                }
            }
        }
    }

}
