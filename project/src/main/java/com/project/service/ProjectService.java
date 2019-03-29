package com.project.service;

import com.project.entity.ProjectEntity;

/**
 * Created by zzl on 2019/3/26.
 */
public interface ProjectService extends BaseService<ProjectEntity> {
    public int upStatus(ProjectEntity projectEntity);
}
