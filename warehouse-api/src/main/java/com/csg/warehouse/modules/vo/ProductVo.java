package com.csg.warehouse.modules.vo;

import com.csg.warehouse.utils.excel.annotation.ExcelField;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

public class ProductVo {

    @ExcelField(title = "商品编码", sort = 10, type = 1)
    private String code;

    @NotBlank(message = "供应商不能为空")
    @ExcelField(title = "供应商", sort = 10)
    private String supplierName;

    @NotBlank(message = "商品类别不能为空")
    @ExcelField(title = "商品类别", sort = 20)
    private String categoryName;

    @NotBlank(message = "默认仓库不能为空")
    @ExcelField(title = "默认仓库", sort = 30)
    private String warehouseName;

    @NotBlank(message = "货架号不能为空")
    @ExcelField(title = "货架号", sort = 40, type = 2)
    private String rackCode;

    @DecimalMin(value = "1", message = "存放层必须为数字且大于0")
    @ExcelField(title = "存放层", sort = 50, type = 2)
    private Integer layerNum;

    @DecimalMin(value = "1", message = "存放位置必须为数字且大于0")
    @ExcelField(title = "存放位置", sort = 60, type = 2)
    private Integer placeNum;

    @NotBlank(message = "规格型号不能为空")
    @ExcelField(title = "规格型号", sort = 70)
    private String specification;

    @ExcelField(title = "适用装置", sort = 80)
    private String device;

    @ExcelField(title = "参数", sort = 90)
    private String parameter;

    @DecimalMin(value = "1", message = "期初数量必须大于0")
    @ExcelField(title = "期初数量", sort = 100, type = 2)
    private Integer initQuantity;

    @ExcelField(title = "当前库存", sort = 100, type = 1)
    private Integer inventory;

    @ExcelField(title = "计量单位", sort = 110)
    private String unitName;

    @ExcelField(title = "库存上限", sort = 120)
    private Integer minInventory;

    @ExcelField(title = "库存下限", sort = 130)
    private Integer maxInventory;

    @ExcelField(title = "备注", sort = 140)
    private String remark;


    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getRackCode() {
        return rackCode;
    }

    public void setRackCode(String rackCode) {
        this.rackCode = rackCode;
    }

    public Integer getLayerNum() {
        return layerNum;
    }

    public void setLayerNum(Integer layerNum) {
        this.layerNum = layerNum;
    }

    public Integer getPlaceNum() {
        return placeNum;
    }

    public void setPlaceNum(Integer placeNum) {
        this.placeNum = placeNum;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public Integer getInitQuantity() {
        return initQuantity;
    }

    public void setInitQuantity(Integer initQuantity) {
        this.initQuantity = initQuantity;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public Integer getMinInventory() {
        return minInventory;
    }

    public void setMinInventory(Integer minInventory) {
        this.minInventory = minInventory;
    }

    public Integer getMaxInventory() {
        return maxInventory;
    }

    public void setMaxInventory(Integer maxInventory) {
        this.maxInventory = maxInventory;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
