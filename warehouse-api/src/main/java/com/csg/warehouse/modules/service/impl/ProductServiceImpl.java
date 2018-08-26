package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.*;
import com.csg.warehouse.modules.mapper.ProductMapper;
import com.csg.warehouse.modules.service.*;
import com.csg.warehouse.utils.StringUtils;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 商品表 服务实现类
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@Service
public class ProductServiceImpl extends BaseServiceImpl<ProductMapper, Product> implements ProductService {

    @Autowired
    private ProductWarehouseService productWarehouseService;

    @Autowired
    private MerchantService merchantService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private UnitService unitService;
    @Autowired
    private WarehouseService warehouseService;

    @Transactional
    public void save(Product product) {
        super.save(product);
        ProductWarehouse productWarehouse = product.getProdWh();
        if (productWarehouse != null) {
            productWarehouse.setProductId(product.getId());
            productWarehouse.setInventory(productWarehouse.getInitQuantity());
            productWarehouse.setWarehouseId(product.getPreferredWarehouseId());
            productWarehouseService.save(productWarehouse);
        }
        buildExtra(product);
    }

    @Override
    public Page<Product> selectPage(Page<Product> page, Map<String, String> params) {
        List<Product> products = this.baseMapper.findPage(page, params);
        page.setRecords(products);
        if (CollectionUtils.isNotEmpty(page.getRecords())) {
            for (Product p : page.getRecords()) {
                buildExtra(p);
            }
        }
        return page;
    }

    private void buildExtra(Product product) {
        Merchant supplier =  merchantService.selectById(product.getSupplierId());
        if (supplier != null) {
            product.setSupplierName(supplier.getName());
        }
        Category category = categoryService.selectById(product.getCategoryId());
        if (category != null) {
            product.setCategoryName(category.getName());
        }
        Unit unit = unitService.selectById(product.getUnitId());
        if (unit != null) {
            product.setUnitName(unit.getName());
        }
        Warehouse warehouse = warehouseService.selectById(product.getPreferredWarehouseId());
        if (warehouse != null) {
            product.setWarehouseName(warehouse.getName());
        }

        ProductWarehouse param = new ProductWarehouse();
        param.setWarehouseId(product.getPreferredWarehouseId());
        param.setProductId(product.getId());
        ProductWarehouse pw = productWarehouseService.selectOne(new EntityWrapper<>(param));
        if (pw != null) {
            product.setProdWh(pw);
        }
    }

    @Override
    public boolean exist(Product product, String value) {
        boolean isExist = false;
        if (isValidEntityId(product)) {
            Product productDb = findByCode(value);
            if (productDb != null && !product.getId().equals(productDb.getId())) {
                isExist = true;
            }
        } else {
            Product productDb = findByCode(value);
            if (productDb != null) {
                isExist = true;
            }
        }
        return isExist;
    }

    private Product findByCode(String code) {
        if (StringUtils.isNotBlank(code)) {
            Product param = new Product();
            param.setCode(code);
            return this.selectOne(new EntityWrapper<>(param));
        } else {
            return null;
        }
    }
}
