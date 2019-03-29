package com.project.service.impl;

import com.project.dao.UserDAO;
import com.project.dto.PageResult;
import com.project.dto.Total;
import com.project.entity.UserEntity;
import com.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by zzl on 2019/2/26.
 */
@Service
public class UserServiceImpl  implements UserService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public Integer add(UserEntity userEntity) {
        return userDAO.add(userEntity);
    }

    @Override
    public Integer delete(UserEntity userEntity) {
        return userDAO.delete(userEntity);
    }

    @Override
    public Integer update(UserEntity userEntity) {
        return userDAO.update(userEntity);
    }

    @Override
    public List<UserEntity> get(Map map) {
        return userDAO.get(map);
    }

    @Override
    public Integer getCount(Map map) {
        return userDAO.getCount(map);
    }

    @Override
    public List<UserEntity> get_(Map map) {
        return userDAO.get_(map);
    }

    @Override
    public Total getCount_(Map map) {
        return null;
    }

    @Override
    public UserEntity getByEntity(UserEntity userEntity) {
        return userDAO.getByEntity(userEntity);
    }

    public PageResult<UserEntity> getALl(Map map){
        PageResult<UserEntity> userEntityPageResult = new PageResult<UserEntity>();
        userEntityPageResult.setTotal(userDAO.getCount(map));
        userEntityPageResult.setData(userDAO.get(map));
        return userEntityPageResult;
    }

}
