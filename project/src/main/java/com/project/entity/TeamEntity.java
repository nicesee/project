package com.project.entity;

import java.io.Serializable;

/**
 * Created by zzl on 2019/2/26.
 */
public class TeamEntity implements Serializable {
    private int id;
    private  String status;//信息状态
    private int teamNumber;//成员编号
    private String teamName;//成员姓名
    private String task;//任务
    private int projectID;//项目id

    public int getProjectID() {
        return projectID;
    }

    public void setProjectID(int projectID) {
        this.projectID = projectID;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTeamNumber() {
        return teamNumber;
    }

    public void setTeamNumber(int teamNumber) {
        this.teamNumber = teamNumber;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
