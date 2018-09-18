package com.csg.warehouse.modules.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.modules.entity.Warehousing;
import com.csg.warehouse.modules.vo.PieChartDataVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 出库入库记录表 Mapper 接口
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
public interface WarehousingMapper extends BaseMapper<Warehousing> {

    List<Warehousing> findPage(Page page, Map<String, String> params);

    List<PieChartDataVo> findStatisticGroupByMerchant(@Param("action") int action);

}
