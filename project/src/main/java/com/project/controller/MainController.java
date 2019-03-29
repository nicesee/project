package com.project.controller;

import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by luoming on 2017/11/13.
 */
@Controller
public class MainController {

    @Autowired
    private  UserService userService;
    @RequestMapping("/main")
    public String list(){
        return "/main";

    }

    @RequestMapping("/register")
    public String register(){
        return "/register";
    }

//    @RequestMapping("/user")
//    @ResponseBody
//    public String gg(){
//        Map<String,String> map = new HashMap<String, String>();
//        map.put("a","a");
//        return userService.get(map).toString();
//    }
}






