package com.project.dto;

/**
 * Created by luoming on 2017/12/27.
 */
public class UserDTO extends BaseDTO {

    private String account;
    private String name;

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

