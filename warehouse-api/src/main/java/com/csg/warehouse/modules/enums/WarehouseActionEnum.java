package com.csg.warehouse.modules.enums;

public enum WarehouseActionEnum {
    OUT(1, "出库"),
    IN(2, "入库");

    private int value;
    private String text;

    WarehouseActionEnum(int value, String text) {
        this.value = value;
        this.text = text;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
