package com.csg.warehouse.modules.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.BaseService;
import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.vo.PieChartDataVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 出库入库记录表 服务类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface WarehousingService extends BaseService<Warehousing> {

    void saveBatch(List<Warehousing> warehousings, Integer userId);

    Page<Warehousing> selectPage(Page<Warehousing> page, Map<String, String> params);

    List<PieChartDataVo> findStatisticGroupByMerchant(int action);
}
