package com.csg.warehouse.web;


import java.io.Serializable;

/**
 * 接口返回数据
 *
 * @param <E>
 */
public class WebApiResponse<E> implements Serializable {

    public final static int SUCCESS = 1;
    public final static int ERROR = 0;

    // 状态编码
    private int code;
    // 信息
    private String message;
    // 数据
    private E data;

    public WebApiResponse() {
    }

    public static WebApiResponse success() {
        return new WebApiResponse(SUCCESS);
    }

    public static <T> WebApiResponse<T> success(T data) {
        WebApiResponse<T> result = new WebApiResponse<>(SUCCESS);
        result.setData(data);
        return result;
    }

    public static WebApiResponse error() {
        return new WebApiResponse<>(ERROR);
    }

    public static <T> WebApiResponse<T> error(String message) {
        return new WebApiResponse<>(ERROR, message);
    }

    public WebApiResponse(int code) {
        this.code = code;
    }

    public WebApiResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public WebApiResponse(int code, String message, E data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public E getData() {
        return data;
    }

    public void setData(E data) {
        this.data = data;
    }
}
