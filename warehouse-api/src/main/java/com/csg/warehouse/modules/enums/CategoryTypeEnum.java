package com.csg.warehouse.modules.enums;

public enum CategoryTypeEnum {
    SUPPLIER(1),
    CLIENT(2),
    PRODUCT(3);

    int value;

    CategoryTypeEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
