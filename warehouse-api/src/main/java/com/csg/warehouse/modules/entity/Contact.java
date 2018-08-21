package com.csg.warehouse.modules.entity;

import com.baomidou.mybatisplus.annotations.TableName;
import com.csg.warehouse.common.entity.IdEntity;

/**
 * <p>
 * 联系人表
 * </p>
 *
 * @author kamen
 * @since 2018-04-10
 */
@TableName("t_contact")
public class Contact extends IdEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 名称
     */
    private String name;
    /**
     * 手机
     */
    private String phone;
    /**
     * 座机
     */
    private String tel;
    /**
     * QQ/微信/Email
     */
    private String snsContact;
    /**
     * 联系地址
     */
    private String address;
    /**
     * 首要联系人标识
     */
    private Integer primaryInd;
    /**
     * 供应商/客户id
     */
    private Integer merchantId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getSnsContact() {
        return snsContact;
    }

    public void setSnsContact(String snsContact) {
        this.snsContact = snsContact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getPrimaryInd() {
        return primaryInd;
    }

    public void setPrimaryInd(Integer primaryInd) {
        this.primaryInd = primaryInd;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }


    @Override
    public String toString() {
        return "Contact{" +
        ", name=" + name +
        ", phone=" + phone +
        ", tel=" + tel +
        ", snsContact=" + snsContact +
        ", address=" + address +
        ", primaryInd=" + primaryInd +
        ", merchantId=" + merchantId +
        "}";
    }
}
