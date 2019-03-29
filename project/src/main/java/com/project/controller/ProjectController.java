package com.project.controller;

import com.project.common.CommonUtils;
import com.project.dto.PageResult;
import com.project.entity.ProjectEntity;
import com.project.entity.TeamEntity;
import com.project.service.ProjectService;
import com.project.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by zzl on 2019/3/26.
 */
@Controller
@RequestMapping("/project")
public class ProjectController extends BaseController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/list")
    public String list(){
        Map<String,String> map = this.getParamMap();
        return "project/list";
    }
    @RequestMapping("/updateList")
    public String updateList(){
        Map<String,String> map = this.getParamMap();
        request.setAttribute("check",map.get("check"));
        request.setAttribute("ID",map.get("ID"));
        return "project/detail";
    }

    @RequestMapping("/get")
    @ResponseBody
    public Map get(){
        Map<String,String> map = this.getParamMap();
        PageResult<ProjectEntity> pageResult = projectService.get(map);
        map.put("pageResult", CommonUtils.listToJson(pageResult));
        return map;
    }

    @RequestMapping("/add")
    @ResponseBody
    public Map add(){
        Map<String,String> map = this.getParamMap();
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setDes(map.get("des"));
        projectEntity.setName(map.get("name"));
        projectEntity.setMainName(map.get("mainName"));
        projectEntity.setMainNumber(Integer.parseInt(map.get("mainNumber")));
        projectEntity.setProjectStatus("团队组建中");
        if(projectService.add(projectEntity)==1){

                map.put("check","true");
        }else {
            map.put("check","false");
        }
        return map;
    }

    @RequestMapping("/update")
    @ResponseBody
    public Map update(){
        Map<String,String> map = this.getParamMap();
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setDes(map.get("des"));
        projectEntity.setName(map.get("name"));
        projectEntity.setMainName(map.get("mainName"));
        projectEntity.setMainNumber(Integer.parseInt(map.get("mainNumber")));
        projectEntity.setProjectStatus(map.get("projectStatus"));
        projectEntity.setId(Integer.parseInt(map.get("ID")));
        if(projectService.update(projectEntity) == 1){
                map.put("check","true");
        }else {
            map.put("check","false");
        }
        return map;
    }

    @RequestMapping("/upStatus")
    public String updateStatus(){
        Map<String,String> map = this.getParamMap();
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setProjectStatus(map.get("projectStatus"));
        projectEntity.setId(Integer.parseInt(map.get("ID")));
        if(projectService.upStatus(projectEntity)==1) {
         request.setAttribute("flag","true");
        }
        else {
            request.setAttribute("flag","false");
        }

        return "project/list";
    }

    @ResponseBody
    @RequestMapping("/getEntity")
    public String getEntity(){
        Map<String,String> map = this.getParamMap();
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId(Integer.parseInt(map.get("ID")));
        projectEntity = projectService.getByEntity(projectEntity);
        return CommonUtils.objToJson(projectEntity);
    }
}
