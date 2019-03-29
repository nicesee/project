package com.project.filter;

import com.project.entity.UserEntity;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LogCostFilter implements Filter {


    private static List<String> notNeedLoginURIList = new ArrayList<String>();

    static {
        notNeedLoginURIList.add("/");
        notNeedLoginURIList.add("/login");
        notNeedLoginURIList.add("/register");
        notNeedLoginURIList.add("/user/login");
        notNeedLoginURIList.add("/user/logout");
        notNeedLoginURIList.add("/user/register");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
        String requestURI = httpServletRequest.getRequestURI();
        if(!(requestURI.equals("/") || requestURI.equals("/user/login") || requestURI.equals("/user/logout") || requestURI.equals("/user/add") || requestURI.equals("/register") ||
        requestURI.startsWith("/js") ||requestURI.endsWith(".js") || requestURI.endsWith(".css") || requestURI.endsWith(".png") || requestURI.endsWith(".jpg") || requestURI.endsWith(".map"))) {
            UserEntity userEntity = (UserEntity)httpServletRequest.getSession().getAttribute("user");
            if (userEntity == null ){
                httpServletResponse.sendRedirect("/");
                return;
            }
        }
            filterChain.doFilter(servletRequest, servletResponse);

    }

    @Override
    public void destroy() {

    }
}