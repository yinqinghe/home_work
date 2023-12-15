package com.example.home_work.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.home_work.entity.Friends;
import com.example.home_work.entity.WorkShare;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface WorkShareMapper extends BaseMapper<WorkShare> {

    @Select("select * from work_share where can_userid=#{can_userid}")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "workid",property = "workid"),
            @Result(column = "videoid",property = "videoid"),
            @Result(column = "can_userid",property = "can_userid"),
            @Result(column = "workid",property = "workid_d",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.UploadImageMapper.selectByID")
            ),
            @Result(column = "videoid",property = "videoid_d",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.UploadVideoMapper.selectByID")
            ),
    })
    List<WorkShare> selectShare(String can_userid);

    @Select("SELECT *  FROM work_share where author=#{can_userid} ORDER BY createDate DESC")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "workid",property = "workid"),
            @Result(column = "videoid",property = "videoid"),
            @Result(column = "can_userid",property = "can_userid"),
            @Result(column = "workid",property = "workid_d",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.UploadImageMapper.selectByID")
            ),
            @Result(column = "can_userid",property = "can_userid_d",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.cUserMapper.selectByID")
            ),
            @Result(column = "videoid",property = "videoid_d",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.UploadVideoMapper.selectByID")
            ),
    })
    List<WorkShare> myShare(String can_userid);

}

