package com.project.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by xujiaheng on 2018/1/22.
 */
@Controller
public class LoginController {

    @RequestMapping("/")
    public String index(HttpServletResponse response) throws IOException {
        return  "login";
    }
}
