package com.csg.warehouse.common.jackson;

import com.csg.warehouse.utils.DateUtils;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.Date;

public class DateSerializer extends JsonSerializer<Date> {
    @Override
    public void serialize(Date value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (DateUtils.isMinDate(value) || DateUtils.isMaxDate(value)) {
            // 如果为系统默认的最小或者最大时间，则返回空字符串
            // 这里判断只根据年月日做判断，忽略时间部分
            gen.writeString("");
        } else {
            gen.writeString(DateUtils.formatDatetime(value));
        }
    }
}
