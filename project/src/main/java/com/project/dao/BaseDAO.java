package com.project.dao;



import com.project.dto.Total;

import java.util.List;
import java.util.Map;

/**
 * Created by luoming on 2015/11/9.
 */
public interface BaseDAO<T> {

    Integer add(T t);

    Integer delete(T t);

    Integer update(T t);

    List<T> get(Map map);

    Integer getCount(Map map);

    List<T> get_(Map map);//get_去掉

    Total getCount_(Map map);//合并

    T getByEntity(T t);

}
