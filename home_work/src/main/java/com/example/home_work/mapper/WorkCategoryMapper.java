package com.example.home_work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.home_work.entity.WorkCategory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface WorkCategoryMapper extends BaseMapper<WorkCategory> {
    @Select("select * from work_category where workid=#{categorid}")
    List<WorkCategory> selectByID(String categoryid);

}
