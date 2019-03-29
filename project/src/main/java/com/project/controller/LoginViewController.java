//package com.project.controller;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.util.DigestUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import javax.servlet.http.HttpServletRequest;
//
//
//@Controller
//public class LoginViewController {
//
//    // 预先设置好的正确的用户名和密码，用于登录验证
//    private String rightUserName = "admin";
//    private String rightPassword = "admin";
//
//    /**
//     * 登录校验
//     *
//     * @param request
//     * @return
//     */
//    @RequestMapping("/login")
//    public String login(HttpServletRequest request) {
//        String username = request.getParameter("username");
//        String password = request.getParameter("password");
//        if (null == username || null == password) {
//            return "redirect:/";
//        }
//
//        // 前端传回的密码实际为用户输入的：用户名（小写）+ 密码（小写）组合的字符串生成的md5值
//        // 此处先通过后台保存的正确的用户名和密码计算出正确的md5值，然后和前端传回来的作比较
//        String md5info = rightUserName.toLowerCase() + rightPassword.toLowerCase();
//        String realPassword = DigestUtils.md5DigestAsHex(md5info.getBytes());
//        if (!password.equals(realPassword)) {
//            return "redirect:/";
//        }
//
//        // 校验通过时，在session里放入一个标识
//        // 后续通过session里是否存在该标识来判断用户是否登录
//        request.getSession().setAttribute("loginName", "admin");
//        return "redirect:/welcome";
//    }
//
//    /**
//     * 注销登录
//     *
//     * @param request
//     * @return
//     */
//    @RequestMapping("/loginout")
//    public String loginOut(HttpServletRequest request) {
//        request.getSession().invalidate();
//        return "redirect:/";
//    }
//
//}
