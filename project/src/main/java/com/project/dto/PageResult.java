package com.project.dto;




import java.util.List;

/**
 * Created by kongbo on 2016/8/22.
 */
public class PageResult<T> {

    private int total;
    private int totalPage;
    private List<T> data;
    private Object object;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
//        this.totalPage = PageUtil.getTotalPage(this.total);
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }
}
