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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by zzl on 2019/3/26.
 */
@Controller
@RequestMapping("/team")
public class TeamController extends BaseController{
    @Autowired
    private TeamService teamService;
    @Autowired
    private ProjectService projectService;


    @RequestMapping("/updateList")
    public String updateList(){
        Map<String,String> map = this.getParamMap();
        request.setAttribute("check",map.get("check"));
        request.setAttribute("projectID",map.get("ID"));
        return "team/detail";
    }

    @RequestMapping("/get")
    @ResponseBody
    public String get(){
        Map<String,String> map = this.getParamMap();
        List<TeamEntity> teamEntities = teamService.get_(map);
        return CommonUtils.listToJson(teamEntities);
    }

    @RequestMapping("/add")
    public Map add(){
        Map<String,String> map = this.getParamMap();
        int n = CommonUtils.strToInt(map.get("n"));
        List<TeamEntity> teamEntities = new ArrayList<TeamEntity>();
        for (int i = 1;i<(n+1);i++){
            TeamEntity teamEntity = new TeamEntity();
            teamEntity.setTask(map.get("task"+i));
            teamEntity.setTeamNumber(Integer.parseInt(map.get("teamNumber"+i)));
            teamEntity.setProjectID(Integer.parseInt(map.get("projectID")));
            teamEntities.add(teamEntity);
        }
        for (int i = 0;i<teamEntities.size();i++){
            TeamEntity teamEntity = teamEntities.get(i);
            for (int j = (i+1);j<teamEntities.size();j++){
                TeamEntity teamEntity1 = teamEntities.get(j);
                if(teamEntity.getTeamNumber() == teamEntity1.getTeamNumber()){
                    map.put("check","团队成员重复！");
                    return map;
                }
            }
        }
        if(teamService.add(teamEntities)==1){
            map.put("check","添加成功");
        }else {
            map.put("check","添加失败");
        }
        return map;
    }

    @RequestMapping("/update")
    @ResponseBody
    public Map update(){
        Map<String,String> map = this.getParamMap();
        int n = CommonUtils.strToInt(map.get("n"));
        List<TeamEntity> teamEntities = new ArrayList<TeamEntity>();
        for (int i = 1;i<n;i++){
            TeamEntity teamEntity = new TeamEntity();
            teamEntity.setTask(map.get("task"+i));
            teamEntity.setTeamNumber(Integer.parseInt(map.get("teamNumber"+i)));
            teamEntity.setProjectID(Integer.parseInt(map.get("projectID")));
            teamEntity.setId(Integer.parseInt(map.get("id"+i)));
            teamEntities.add(teamEntity);
        }
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId(Integer.parseInt(map.get("projectID")));
        projectEntity.setProjectStatus("研发中");

        if(teamService.update(teamEntities,projectEntity) == 1){
                map.put("check","true");
        }else {
            map.put("check","false");
        }
        return map;
    }

    @RequestMapping("/del")
    @ResponseBody
    public Map del(){
        Map<String,String> map = this.getParamMap();
        TeamEntity teamEntity = new TeamEntity();
        teamEntity.setId(Integer.parseInt(map.get("ID")));
        if(teamService.delete(teamEntity) == 1){
            map.put("check","true");
        }else {
            map.put("check","false");
        }
        return  map;
    }
}
