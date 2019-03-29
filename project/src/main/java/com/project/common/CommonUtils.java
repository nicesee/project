package com.project.common;



import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultDefaultValueProcessor;

import java.util.*;

/**
 * Created by xujiaheng on 2015/11/9.
 */
public class CommonUtils {


    public static boolean isNotNull(Object o) {
        if(o != null) {
            return true;
        }
        return false;
    }

    public static boolean isNull(Object o) {
        if(o == null) {
            return true;
        }
        return false;
    }

    public static List arrayToList(Object[] objectArr) {
        List list = null;
        if(objectArr != null) {
            list = new ArrayList();
            for(int i=0;i<objectArr.length;i++) {
                list.add(objectArr[i]);
            }
        }
        return list;
    }

    public static String objToJson(Object obj) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerDefaultValueProcessor(Integer.class, new DefaultDefaultValueProcessor());
        jsonConfig.registerDefaultValueProcessor(Double.class, new DefaultDefaultValueProcessor());
        return JSONObject.fromObject(obj, jsonConfig).toString();
    }


    public static Map<String, Object> jsonToMap(String json) {
        if(json == null) {
            return null;
        }
        JSONObject jsonObject = JSONObject.fromObject(json);
        return JSONObject.fromObject(jsonObject);
    }

    public static Collection jsonToCollection(String json) {
        if(json == null) {
            return null;
        }
        JSONArray jsonArray = JSONArray.fromObject(json);
        return JSONArray.toCollection(jsonArray);
    }

    public static String listToJson(Object obj) {
        if(obj == null) {
            obj = new ArrayList();
        }
        return JSONArray.fromObject(obj).toString();
    }


    public static Integer strToInt(String str) {
        try {
            return Integer.valueOf(str);
        } catch(Exception e) {
            return null;
        }
    }

    public static String intToStr(Integer i) {
        try {
            return String.valueOf(i);
        }catch (Exception e) {
            return null;
        }
    }

    public static Boolean strToBoolean(String str) {
        try {
            return Boolean.valueOf(str);
        } catch(Exception e) {
            return null;
        }
    }

    public static Double strToDouble(String str) {
        try {
            return Double.valueOf(str);
        } catch(Exception e) {
            return null;
        }
    }

    public static String floatToString(String str) {
        try {
            return String.valueOf(str);
        } catch(Exception e) {
            return null;
        }
    }

    public static String doubleToStr(Double d) {
        try {
            return String.valueOf(d);
        }catch (Exception e) {
            return null;
        }
    }

    public static int random() {
        return new Random().nextInt(90000) + 10000;
    }

    public static int random(int maxValue) {
        return new Random().nextInt(maxValue);
    }

    public static String randomCode() {
        return randomCode(10);
    }

    public static String randomCode(int bit) {
        String[] codeArr = new String[]{"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r",
                "s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"};
        StringBuffer stringBuffer = new StringBuffer();
        for(int i=0;i<bit;i++) {
            stringBuffer.append(codeArr[random(36)]);
        }
        return stringBuffer.toString();
    }

    public static String code(Integer deviceGroupID) {
        return deviceGroupID + "_" + System.currentTimeMillis();
    }

    public static String formatStr(Object o) {
        if(isNull(o)) {
            return "";
        }
        return String.valueOf(o);
    }
    public static String strToDateFormat(String str){
        char[] array=str.toCharArray();
        String date=""+array[0]+array[1]+array[2]+array[3]
                +"-"+array[4]+array[5]+"-"+array[6]+array[7];
        return date;
    }

    public static boolean isGreaterThanZero(int count) {
        if(count > 0) {
            return true;
        }
        return false;
    }

    public static Double isNullThanZero(Double o) {
        if(isNull(o)) {
            return 0.00;
        }
        return o;
    }

    public static void main(String[] args) {
    }


}
