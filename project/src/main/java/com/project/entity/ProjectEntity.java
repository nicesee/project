package com.project.entity;

import java.io.Serializable;

/**
 * Created by zzl on 2019/2/26.
 */
public class ProjectEntity implements Serializable {

    private int id;
    private String name;//项目名称
    private String des;//项目描述
    private String projectStatus;//项目状态:发起中，团队组建，研发中，已完成。
    private int status;//信息状态
    private int mainNumber;//项目负责人
    private String mainName;//项目负责人

    public int getMainNumber() {
        return mainNumber;
    }

    public void setMainNumber(int mainNumber) {
        this.mainNumber = mainNumber;
    }

    public String getMainName() {
        return mainName;
    }

    public void setMainName(String mainName) {
        this.mainName = mainName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
