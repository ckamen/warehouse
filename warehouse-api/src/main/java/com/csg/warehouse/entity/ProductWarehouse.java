package com.csg.warehouse.entity;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.annotations.TableLogic;
import java.io.Serializable;

/**
 * <p>
 * 商品仓库关系表
 * </p>
 *
 * @author kamen
 * @since 2018-04-08
 */
@TableName("t_product_warehouse")
public class ProductWarehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 商品ID
     */
    private Integer productId;
    /**
     * 仓库ID
     */
    private Integer warehouseId;
    /**
     * 期初数量
     */
    private Integer initQuantity;
    /**
     * 单位价格
     */
    private Float price;
    /**
     * 最低库存
     */
    private Integer minInventory;
    /**
     * 最高库存
     */
    private Integer maxInventory;
    /**
     * 库存
     */
    private Integer inventory;
    /**
     * 货架ID
     */
    private Integer rackId;
    /**
     * 货架层
     */
    private String layer;
    /**
     * 位置
     */
    private String place;
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


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Integer getInitQuantity() {
        return initQuantity;
    }

    public void setInitQuantity(Integer initQuantity) {
        this.initQuantity = initQuantity;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
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

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getRackId() {
        return rackId;
    }

    public void setRackId(Integer rackId) {
        this.rackId = rackId;
    }

    public String getLayer() {
        return layer;
    }

    public void setLayer(String layer) {
        this.layer = layer;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
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

    @Override
    public String toString() {
        return "ProductWarehouse{" +
        ", id=" + id +
        ", productId=" + productId +
        ", warehouseId=" + warehouseId +
        ", initQuantity=" + initQuantity +
        ", price=" + price +
        ", minInventory=" + minInventory +
        ", maxInventory=" + maxInventory +
        ", inventory=" + inventory +
        ", rackId=" + rackId +
        ", layer=" + layer +
        ", place=" + place +
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
