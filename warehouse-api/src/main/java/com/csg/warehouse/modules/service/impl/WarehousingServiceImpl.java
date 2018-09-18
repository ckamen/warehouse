package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.ProductWarehouse;
import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.enums.WarehouseActionEnum;
import com.csg.warehouse.modules.mapper.WarehousingMapper;
import com.csg.warehouse.modules.service.ProductWarehouseService;
import com.csg.warehouse.modules.service.WarehousingService;
import com.csg.warehouse.modules.vo.PieChartDataVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

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
    public void saveBatch(List<Warehousing> warehousings, Integer userId) {
        if (warehousings != null && warehousings.size() > 0) {
            for (Warehousing wh : warehousings) {
                if (isValidId(wh.getProductId())) {
                    wh.setCreatedTime(new Date());
                    super.save(wh, userId);

                    ProductWarehouse param = new ProductWarehouse();
                    param.setWarehouseId(wh.getWarehouseId());
                    param.setProductId(wh.getProductId());
                    ProductWarehouse pw = productWarehouseService.selectOne(new EntityWrapper<>(param));
                    if (wh.getAction() == WarehouseActionEnum.IN.getValue()) {
                        pw.setInventory(pw.getInventory() + wh.getQuantity());
                    } else {
                        pw.setInventory(pw.getInventory() - wh.getQuantity());
                    }
                    wh.setInventory(pw.getInventory());
                    super.updateById(wh);

                    productWarehouseService.save(pw, userId);
                }
            }
        }
    }

    @Override
    public Page<Warehousing> selectPage(Page<Warehousing> page, Map<String, String> params) {
        List<Warehousing> warehousings = this.baseMapper.findPage(page, params);
        page.setRecords(warehousings);

        return page;
    }

    @Override
    public List<PieChartDataVo> findStatisticGroupByMerchant(int action) {
        return this.baseMapper.findStatisticGroupByMerchant(action);
    }
}
