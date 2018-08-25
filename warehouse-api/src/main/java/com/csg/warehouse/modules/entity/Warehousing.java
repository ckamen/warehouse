package com.csg.warehouse.modules.entity;

import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.annotations.TableName;
import com.csg.warehouse.common.entity.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;

/**
 * <p>
 * 出库入库记录表
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@TableName("t_warehousing")
public class Warehousing extends IdEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 编码
     */
    private String code;

    /**
     * 商品ID
     */
    private Integer productId;

    /**
     * 出库/入库, 1-出库;2-入库
     */
    private Integer action;
    /**
     * 数量
     */
    private Integer quantity;
    /**
     * 出库入库后的库存
     */
    private Integer inventory;
    /**
     * 仓库ID
     */
    private Integer warehouseId;
    /**
     * 供应商/客户ID
     */
    private Integer merchantId;
    /**
     * 单据日期
     */
    private Date receiptDate;
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

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getAction() {
        return action;
    }

    public void setAction(Integer action) {
        this.action = action;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Date getReceiptDate() {
        return receiptDate;
    }

    public void setReceiptDate(Date receiptDate) {
        this.receiptDate = receiptDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "Warehousing{" +
                ", action=" + action +
                ", code=" + code +
                ", productId=" + productId +
                ", quantity=" + quantity +
                ", inventory=" + inventory +
                ", warehouseId=" + warehouseId +
                ", merchantId=" + merchantId +
                ", remark=" + remark +
                ", receiptDate=" + receiptDate +
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
