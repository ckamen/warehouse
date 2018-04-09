package com.csg.warehouse.service.impl;

import com.csg.warehouse.entity.Brand;
import com.csg.warehouse.mapper.BrandMapper;
import com.csg.warehouse.service.BrandService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 品牌表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@Service
public class BrandServiceImpl extends ServiceImpl<BrandMapper, Brand> implements BrandService {

}
