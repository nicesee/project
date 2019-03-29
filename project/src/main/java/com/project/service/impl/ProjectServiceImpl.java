package com.project.service.impl;

import com.project.dao.ProjectDAO;
import com.project.dto.PageResult;
import com.project.entity.ProjectEntity;
import com.project.entity.TeamEntity;
import com.project.service.ProjectService;
import com.project.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by zzl on 2019/3/26.
 */
@Service
@Transactional(rollbackFor = Exception.class)
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectDAO projectDAO;
    @Autowired
    private TeamService teamService;

    @Override
    public int add(ProjectEntity projectEntity) {
        TeamEntity teamEntity = new TeamEntity();
        teamEntity.setTeamNumber(projectEntity.getMainNumber());
        teamEntity.setTeamName(projectEntity.getMainName());
        teamEntity.setTask("项目负责人");
        if(projectDAO.add(projectEntity)==1){
            teamEntity.setProjectID(projectEntity.getId());
            if(teamService.add(teamEntity)==1){
                return 1;
            }
        }
        return 0;
    }

    @Override
    public int add(List<ProjectEntity> projectEntities) {
        return 0;
    }

    @Override
    public int update(ProjectEntity projectEntity) {
        TeamEntity teamEntity = new TeamEntity();
        teamEntity.setProjectID(projectEntity.getId());
        teamEntity.setTeamNumber(projectEntity.getMainNumber());
        teamEntity.setTeamName(projectEntity.getMainName());
        teamEntity.setTask("项目负责人");
        if(teamService.update(teamEntity)==1){
            if (projectDAO.update(projectEntity)==1){
                return 0;
            }
        }
        return 0;
    }

    @Override
    public int delete(ProjectEntity projectEntity) {
        return 0;
    }

    @Override
    public PageResult<ProjectEntity> get(Map<String, String> map) {
        PageResult<ProjectEntity> pageResult = new PageResult<ProjectEntity>();
        pageResult.setTotal(projectDAO.getCount(map));
        pageResult.setData(projectDAO.get(map));
        return pageResult;
    }

    @Override
    public List<ProjectEntity> get_(Map<String, String> map) {
        return projectDAO.get_(map);
    }

    @Override
    public ProjectEntity getByEntity(ProjectEntity projectEntity) {
        return projectDAO.getByEntity(projectEntity);
    }

    @Override
    public int upStatus(ProjectEntity projectEntity) {
        return projectDAO.update(projectEntity);
    }
}
