package com.csg.warehouse.common;

import com.csg.warehouse.common.jackson.DateDeserializer;
import com.csg.warehouse.common.jackson.DateSerializer;
import com.csg.warehouse.common.jackson.TimestampDeserializer;
import com.csg.warehouse.common.jackson.TimestampSerializer;
import com.fasterxml.jackson.databind.module.SimpleModule;

import java.sql.Timestamp;
import java.util.Date;

public class CustomJsonModule extends SimpleModule {
    public CustomJsonModule() {
//        this.addSerializer(Long.class, ToStringSerializer.instance);
//        this.addSerializer(Long.TYPE, ToStringSerializer.instance);
        this.addDeserializer(Timestamp.class, new TimestampDeserializer());
        this.addSerializer(Timestamp.class, new TimestampSerializer());
        this.addDeserializer(Date.class, new DateDeserializer());
        this.addSerializer(Date.class, new DateSerializer());
    }
}
