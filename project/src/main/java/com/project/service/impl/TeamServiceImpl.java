package com.project.service.impl;

import com.project.dao.TeamDAO;
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
public class TeamServiceImpl implements TeamService  {
    @Autowired
    private TeamDAO teamDAO;
    @Autowired
    private ProjectService projectService;

    @Override
    public int add(TeamEntity teamEntity) {
        return teamDAO.add(teamEntity);
    }

    @Override
    public int add(List<TeamEntity> teamEntities) {
        int check = 0;
        for (int i = 0;i<teamEntities.size();i++){
            check = teamDAO.add(teamEntities.get(i));
        }
        return check;
    }

    @Override
    public int update(TeamEntity teamEntity) {
        return teamDAO.update(teamEntity);
    }

    @Override
    public int update(List<TeamEntity> teamEntities, ProjectEntity projectEntity) {
        int check = 0;
        for (int i = 0;i<teamEntities.size();i++){
            check = teamDAO.update(teamEntities.get(i));
        }
        check = projectService.update(projectEntity);
        return check;
    }

    @Override
    public int delete(TeamEntity teamEntity) {
        return teamDAO.delete(teamEntity);
    }

    @Override
    public PageResult<TeamEntity> get(Map<String, String> map) {
        PageResult<TeamEntity> pageResult =new PageResult<TeamEntity>();
        pageResult.setData(teamDAO.get(map));
        pageResult.setTotal(teamDAO.getCount(map));
        return pageResult;
    }

    @Override
    public List<TeamEntity> get_(Map<String, String> map) {
        return teamDAO.get_(map);
    }

    @Override
    public TeamEntity getByEntity(TeamEntity teamEntity) {
        return teamDAO.getByEntity(teamEntity);
    }
}
