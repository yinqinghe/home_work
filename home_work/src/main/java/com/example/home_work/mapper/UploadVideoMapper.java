package com.example.home_work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.home_work.entity.UploadImage;
import com.example.home_work.entity.Uploadvideo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UploadVideoMapper extends BaseMapper<Uploadvideo> {

    @Select("select * from work_video where id=#{workid_d}")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "video_url",property = "video_url"),
            @Result(column = "title",property = "title"),
            @Result(column = "content",property = "content"),
            @Result(column = "cuserid",property = "cuserid"),
            @Result(column = "work_categoryid",property = "work_categoryid"),
            @Result(column = "work_categoryid",property = "workcategory",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.WorkCategoryMapper.selectByID")
            ),
    })
    List<Uploadvideo> selectByID(String workid_d);
    @Select("select * from work_video where cuserid=#{cuserid}  and title LIKE CONCAT('%', #{search_key}, '%')")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "video_url",property = "video_url"),
            @Result(column = "title",property = "title"),
            @Result(column = "content",property = "content"),
            @Result(column = "cuserid",property = "cuserid"),
            @Result(column = "work_categoryid",property = "work_categoryid"),
            @Result(column = "work_categoryid",property = "workcategory",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.WorkCategoryMapper.selectByID")
            ),
    })
    List<Uploadvideo> selectvideoAndCategory_(String cuserid,String search_key);
    @Select("select * from work_video where cuserid=#{cuserid}")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "video_url",property = "video_url"),
            @Result(column = "title",property = "title"),
            @Result(column = "content",property = "content"),
            @Result(column = "cuserid",property = "cuserid"),
            @Result(column = "work_categoryid",property = "work_categoryid"),
            @Result(column = "work_categoryid",property = "workcategory",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.WorkCategoryMapper.selectByID")
            ),
    })
    List<Uploadvideo> selectvideoAndCategory(String cuserid);

    @Select("select * from work_video")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "video_url",property = "video_url"),
            @Result(column = "title",property = "title"),
            @Result(column = "content",property = "content"),
            @Result(column = "cuserid",property = "cuserid"),
            @Result(column = "work_categoryid",property = "work_categoryid"),
            @Result(column = "work_categoryid",property = "workcategory",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.WorkCategoryMapper.selectByID")
            ),
    })
    List<Uploadvideo> selectvideoAndCategory_admin();
}
