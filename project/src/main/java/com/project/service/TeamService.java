package com.project.service;

import com.project.entity.ProjectEntity;
import com.project.entity.TeamEntity;

import java.util.List;

/**
 * Created by zzl on 2019/3/26.
 */
public interface TeamService extends BaseService<TeamEntity> {
    public int update(List<TeamEntity> teamEntities, ProjectEntity projectEntity);
}
