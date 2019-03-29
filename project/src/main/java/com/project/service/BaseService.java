package com.project.service;
import com.project.dto.PageResult;

import java.util.List;
import java.util.Map;

/**
 * Created by luven on 2015/12/3.
 */
public interface BaseService<T> {

    public int add(T t);

    public int add(List<T> tList);

    public int update(T t);

    public int delete(T t);

    public PageResult<T> get(Map<String, String> map);

    public List<T> get_(Map<String, String> map);//getList

    public T getByEntity(T t);
}
