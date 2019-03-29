package com.project.controller;

import com.project.common.CommonUtils;
import com.project.dto.UserDTO;
import com.project.entity.UserEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by luoming on 2017/12/25.
 */
@Controller
public class BaseController {

    @Autowired
    protected HttpServletRequest request;
    @Autowired
    protected HttpServletResponse response;

    protected Map<String, String> getParamMap() {
        return formatParamMap(request.getParameterMap());
    }

    private Map<String, String> formatParamMap(Map paramMap) {

        Map<String, String> map = new HashMap<String, String>();
        if (paramMap != null) {
            Set key = paramMap.keySet();
            for (Object o : key.toArray()) {
                try{
                String paramKey = o.toString();
                String paramValue = ((String[]) paramMap.get(o))[0];
                map.put(paramKey, paramValue);
                }
                catch (Exception ex){

                }
            }
        }
        return map;
    }



    protected UserEntity getUser() {
        return (UserEntity) request.getSession().getAttribute("user");
    }

    protected void setUser(UserEntity userEntity) {
        request.getSession().setAttribute("user", userEntity);
    }

    protected UserDTO trans(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setName(userEntity.getName());
        userDTO.setAccount(userEntity.getAccount());
        return userDTO;
    }


}
