package com.project.controller;

import com.project.common.CommonUtils;
import com.project.entity.UserEntity;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by luoming on 2017/11/13.
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController{

    @Autowired
    private UserService userService;


    @RequestMapping("/get")
    @ResponseBody
    public String get(){
        Map<String,String> map = this.getParamMap();
        return CommonUtils.listToJson(userService.get_(map));
    }

    @RequestMapping("/login")
    @ResponseBody
    public Map login(){
        Map<String, String> map = this.getParamMap();
        UserEntity userEntity = new UserEntity();
        userEntity.setAccount(map.get("account"));
        userEntity.setPassword(map.get("password"));
        userEntity = userService.getByEntity(userEntity);
        if(userEntity != null){
            map.put("check","true");
            request.getSession().setAttribute("user",userEntity);
            request.setAttribute("users",userEntity);
        }else {
            map.put("check","false");
        }
        return map;
    }

    @RequestMapping("/add")
    @ResponseBody
    public Map add(){
        Map<String,String> map = this.getParamMap();
        UserEntity userEntity =new UserEntity();
        userEntity.setAccount(map.get("account"));
        userEntity.setAdress(map.get("adress"));
        userEntity.setName(map.get("name"));
        userEntity.setPassword(map.get("password"));
        userEntity.setPhone(map.get("phone"));
        userEntity.setSex(map.get("sex"));
        userEntity.setIdentity("研究人员");
        List<UserEntity> list = userService.get_(map);
        for(int i = 0;i<list.size();i++){
            UserEntity userEntity1 = list.get(i);
            if (userEntity.getAccount().equals(userEntity1.getAccount())){
                map.put("check","用户名存在");
                return map;
            }
        }
        Integer add = userService.add(userEntity);
        if(add == 1){
            map.put("check","true");
        }else{
            map.put("check","error");
        }
        return map;
    }

    @RequestMapping("/logout")
    public String logout() {
        request.getSession().setAttribute("user", null);
        return "login";
    }

}
