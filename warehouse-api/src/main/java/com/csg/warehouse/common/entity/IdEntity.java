package com.csg.warehouse.common.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.util.Objects;

/**
 * 基础主键实体类
 */
public class IdEntity implements Serializable {
    /**
     * ID
     */
    @TableId(value = "id", type = IdType.AUTO)
    protected Integer id;

    /**
     * 获取ID主键
     *
     * @return Integer
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置ID主键
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 复写equals方法，实现用ID主键做对象比较
     *
     * @param obj 目标对比对象
     * @return boolean
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof IdEntity)) {
            return false;
        }
        IdEntity entity = (IdEntity) obj;
        return getId() != null && Objects.equals(getId(), entity.getId());
    }
}
