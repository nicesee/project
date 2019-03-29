package com.project.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by zzl on 2019/2/26.
 */
@Controller
@ComponentScan
public class testController  {

    @RequestMapping("/index")
    public String index(){
        return "test";
    }
}
