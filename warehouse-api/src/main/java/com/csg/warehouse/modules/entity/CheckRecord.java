package com.csg.warehouse.modules.entity;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.csg.warehouse.common.entity.IdEntity;

/**
 * <p>
 * 盘点记录表
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@TableName("t_check_record")
public class CheckRecord extends IdEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 编码
     */
    private String code;
    /**
     * 盘点库存
     */
    private Integer inventory;
    /**
     * 盘盈盘亏
     */
    private Integer profit;
    /**
     * 创建时间
     */
    private Date createdTime;
    /**
     * 创建人
     */
    private Integer createdBy;
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


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getProfit() {
        return profit;
    }

    public void setProfit(Integer profit) {
        this.profit = profit;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
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
        return "CheckRecord{" +
        ", code=" + code +
        ", inventory=" + inventory +
        ", profit=" + profit +
        ", createdTime=" + createdTime +
        ", createdBy=" + createdBy +
        ", updatedBy=" + updatedBy +
        ", updatedTime=" + updatedTime +
        ", deletedInd=" + deletedInd +
        ", deletedBy=" + deletedBy +
        ", deletedTime=" + deletedTime +
        "}";
    }
}
