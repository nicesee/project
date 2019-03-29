//package com.project.dto;
//
//
//import com.cz.entity.UserEntity;
//
///**
// * Created by luoming on 15/5/18.
// */
//public class UserThreadLocal {
//
//    private static ThreadLocal<UserEntity> threadLocal = new ThreadLocal<UserEntity>();
//
//    public static UserEntity get() {
//        return threadLocal.get();
//    }
//
//    public static void set(UserEntity userEntity) {
//        threadLocal.set(userEntity);
//    }
//
//    public static void clear() {
//        threadLocal.set(null);
//        threadLocal.remove();
//    }
//
//}
