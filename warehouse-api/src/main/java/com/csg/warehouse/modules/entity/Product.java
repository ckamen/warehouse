package com.csg.warehouse.modules.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.annotations.TableName;
import com.csg.warehouse.common.entity.IdEntity;

import java.util.Date;

/**
 * <p>
 * 商品表
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@TableName("t_product")
public class Product extends IdEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 编码
     */
    private String code;
    /**
     * 名称
     */
    private String name;
    /**
     * 条码
     */
    private String barCode;
    /**
     * 商品类别ID
     */
    private Integer categoryId;
    /**
     * 规格型号
     */
    private String specification;
    /**
     * 商品品牌ID
     */
    private Integer brandId;
    /**
     * 供应商ID
     */
    private Integer supplierId;
    /**
     * 单位ID
     */
    private Integer unitId;
    /**
     * 首选仓库ID
     */
    private Integer preferredWarehouseId;
    /**
     * 参数
     */
    private String parameter;
    /**
     * 适用装置
     */
    private String device;
    /**
     * 是否启用,1-启用;0-不启用
     */
    private Integer active;
    /**
     * 备注
     */
    private String remark;
    /**
     * 创建人
     */
    private Integer createdBy;
    /**
     * 创建时间
     */
    private Date createdTime;
    /**
     * 更新人
     */
    private Integer updatedBy;
    /**
     * 更新时间
     */
    private Date updatedTime;
    /**
     * 是否已删除,1-是;0-否
     */
    @TableLogic
    private Integer deletedInd;
    /**
     * 删除人
     */
    private Integer deletedBy;
    /**
     * 删除时间
     */
    private Date deletedTime;

    @TableField(exist = false)
    private ProductWarehouse prodWh;

    @TableField(exist = false)
    private String categoryName;

    @TableField(exist = false)
    private String supplierName;

    @TableField(exist = false)
    private String unitName;

    @TableField(exist = false)
    private String warehouseName;


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }


    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public Integer getPreferredWarehouseId() {
        return preferredWarehouseId;
    }

    public void setPreferredWarehouseId(Integer preferredWarehouseId) {
        this.preferredWarehouseId = preferredWarehouseId;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public Integer getActive() {
        return active;
    }

    public void setActive(Integer active) {
        this.active = active;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Integer getDeletedInd() {
        return deletedInd;
    }

    public void setDeletedInd(Integer deletedInd) {
        this.deletedInd = deletedInd;
    }

    public Integer getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(Integer deletedBy) {
        this.deletedBy = deletedBy;
    }

    public Date getDeletedTime() {
        return deletedTime;
    }

    public void setDeletedTime(Date deletedTime) {
        this.deletedTime = deletedTime;
    }

    public ProductWarehouse getProdWh() {
        return prodWh;
    }

    public void setProdWh(ProductWarehouse prodWh) {
        this.prodWh = prodWh;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    @Override
    public String toString() {
        return "Product{" +
                ", code=" + code +
                ", name=" + name +
                ", barCode=" + barCode +
                ", categoryId=" + categoryId +
                ", specification=" + specification +
                ", brandId=" + brandId +
                ", supplier=" + supplierId +
                ", unitId=" + unitId +
                ", preferredWarehouseId=" + preferredWarehouseId +
                ", parameter=" + parameter +
                ", device=" + device +
                ", active=" + active +
                ", remark=" + remark +
                ", createdBy=" + createdBy +
                ", createdTime=" + createdTime +
                ", updatedBy=" + updatedBy +
                ", updatedTime=" + updatedTime +
                ", deletedInd=" + deletedInd +
                ", deletedBy=" + deletedBy +
                ", deletedTime=" + deletedTime +
                "}";
    }
}
