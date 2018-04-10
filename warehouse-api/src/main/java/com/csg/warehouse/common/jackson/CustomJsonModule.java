package com.csg.warehouse.common.jackson;

import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.sql.Timestamp;
import java.util.Date;

public class CustomJsonModule extends SimpleModule {
    public CustomJsonModule() {
        this.addSerializer(Long.class, ToStringSerializer.instance);
        this.addSerializer(Long.TYPE, ToStringSerializer.instance);
        this.addDeserializer(Timestamp.class, new TimestampDeserializer());
        this.addSerializer(Timestamp.class, new TimestampSerializer());
        this.addDeserializer(Date.class, new DateDeserializer());
        this.addSerializer(Date.class, new DateSerializer());
    }
}
