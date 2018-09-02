package com.csg.warehouse.modules.enums;

public enum MerchantTypeEnum {
    SUPPLIER(1),
    CLIENT(2);

    int value;

    MerchantTypeEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
