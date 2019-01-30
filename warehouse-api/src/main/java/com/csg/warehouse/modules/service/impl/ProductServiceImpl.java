package com.csg.warehouse.modules.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.csg.warehouse.common.service.impl.BaseServiceImpl;
import com.csg.warehouse.modules.entity.*;
import com.csg.warehouse.modules.enums.CategoryTypeEnum;
import com.csg.warehouse.modules.enums.MerchantTypeEnum;
import com.csg.warehouse.modules.mapper.ProductMapper;
import com.csg.warehouse.modules.service.*;
import com.csg.warehouse.modules.vo.ProductVo;
import com.csg.warehouse.utils.StringUtils;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

    @Autowired
    private Validator validator;

    @Override
    @Transactional
    public void save(Product product, Integer userId) {
        super.save(product, userId);
        ProductWarehouse productWarehouse = product.getProdWh();
        if (productWarehouse != null) {
            productWarehouse.setProductId(product.getId());
            productWarehouse.setInventory(productWarehouse.getInitQuantity());
            productWarehouse.setWarehouseId(product.getPreferredWarehouseId());
            productWarehouseService.save(productWarehouse, userId);
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
        Merchant supplier = merchantService.selectById(product.getSupplierId());
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

    @Override
    public void delete(Product product, Integer userId) {
        if (isValidEntityId(product)) {
            product.setDeletedInd(1);
            product.setDeletedTime(new Date());
            product.setDeletedBy(userId);
        }
        this.updateById(product);
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

    @Override
    public List<String> saveUpload(List<ProductVo> productVoList, Integer userId) {
        List<String> messages = Lists.newArrayList();
        if (CollectionUtils.isNotEmpty(productVoList)) {
            for (int i = 0; i < productVoList.size(); i++) {
                ProductVo vo = productVoList.get(i);
                if (vo == null || StringUtils.isBlank(vo.getSupplierName())) {
                    continue;
                }
                Set<ConstraintViolation<Object>> constraintViolations = validator.validate(vo);
                int lineNum = i + 1;
                if (constraintViolations.size() > 0) {
                    StringBuilder sb = new StringBuilder();
                    sb.append("第" + lineNum + "行导入失败：");
                    for (ConstraintViolation cv : constraintViolations) {
                        sb.append(cv.getMessage());
                        sb.append(";");
                    }
                    messages.add(sb.toString());
                } else {
                    Product product = new Product();
                    Merchant supplier = merchantService.findBy(vo.getSupplierName(), MerchantTypeEnum.SUPPLIER.getValue());
                    if(supplier == null) {
                        messages.add("第" + lineNum + "行导入失败：" + "供应商名称[" + vo.getSupplierName() + "]不存在于系统中");
                        continue;
                    }
                    Category category = categoryService.findBy(vo.getCategoryName(), CategoryTypeEnum.PRODUCT.getValue());
                    if (category == null) {
                        messages.add("第" + lineNum + "行导入失败：" + "商品类别名称[" + vo.getCategoryName() + "]不存在于系统中");
                        continue;
                    }
                    Warehouse warehouse = warehouseService.findBy(vo.getWarehouseName());
                    if (warehouse == null) {
                        messages.add("第" + lineNum + "行导入失败：" + "仓库名称[" + vo.getCategoryName() + "]不存在于系统中");
                        continue;
                    }
                    Unit unit = unitService.findByName(vo.getUnitName());
                    String code = buildCode(supplier, category, warehouse, vo);
                    Product productDb = findByCode(code);
                    if (productDb != null) {
                        messages.add("第" + lineNum + "行导入失败：" + "商品[" + code + "]已存在于系统中");
                    } else {
                        product.setCode(code);
                        product.setActive(1);
                        product.setCategoryId(category.getId());
                        product.setPreferredWarehouseId(warehouse.getId());
                        product.setSupplierId(supplier.getId());
                        product.setParameter(vo.getParameter());
                        product.setSpecification(vo.getSpecification());
                        product.setDevice(vo.getDevice());
                        if (unit != null) {
                            product.setUnitId(unit.getId());
                        }
                        product.setRemark(vo.getRemark());

                        ProductWarehouse pw = new ProductWarehouse();
                        product.setProdWh(pw);
                        pw.setInitQuantity(vo.getInitQuantity());
                        pw.setMinInventory(vo.getMinInventory());
                        pw.setMaxInventory(vo.getMaxInventory());
                        pw.setRackCode(vo.getRackCode());
                        pw.setLayerNum(vo.getLayerNum());
                        pw.setPlaceNum(vo.getPlaceNum());

                        this.save(product, userId);
                        messages.add("第" + lineNum + "行导入成功。");
                    }
                }
            }
        }
        return messages;
    }

    private String buildCode(Merchant supplier, Category category, Warehouse warehouse, ProductVo vo) {
        StringBuilder sb = new StringBuilder();
        sb.append(supplier.getCode());
        sb.append("-");
        sb.append(category.getCode());
        sb.append("-");
        sb.append(warehouse.getCode());
        sb.append("-");
        sb.append(vo.getRackCode());
        if(vo.getLayerNum() == null) {
            sb.append(0);
        } else {
            sb.append(vo.getLayerNum() > 9 ? vo.getLayerNum() : "0" + vo.getLayerNum());
        }
        if (vo.getPlaceNum() == null) {
            sb.append(0);
        } else {
            sb.append(vo.getPlaceNum() > 9 ? vo.getPlaceNum() : "0" + vo.getPlaceNum());
        }
        return sb.toString();
    }

    @Override
    public List<ProductVo> findVoList() {
        return this.baseMapper.findVoList();
    }

    @Override
    public Page<ProductVo> findWarningInventory(Page<ProductVo> page) {
        List<ProductVo> records = baseMapper.findWarningInventory(page);
        page.setRecords(records);
        return page;
    }
}
