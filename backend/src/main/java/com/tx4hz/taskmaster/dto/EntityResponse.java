package com.tx4hz.taskmaster.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntityResponse<T> {
    private String status;
    private T data;
    private String message;

    public static <T> EntityResponse<T> success(T data) {
        EntityResponse<T> response = new EntityResponse<>();
        response.setStatus("success");
        response.setData(data);
        response.setMessage(null);
        return response;
    }

    public static <T> EntityResponse<T> error(String message) {
        EntityResponse<T> response = new EntityResponse<>();
        response.setStatus("error");
        response.setMessage(message);
        return response;
    }
}
