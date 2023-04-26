package com.example.home_work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.home_work.entity.Friends;
import com.example.home_work.entity.UploadImage;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FriendsMapper extends BaseMapper<Friends> {
    @Select("SELECT COUNT(*) FROM friends WHERE cuserid = #{cuserid} AND ouserid = #{ouserid}")
    Integer countByField1AndField2(Friends friends);

    @Insert("INSERT INTO friends (cuserid, ouserid) SELECT #{cuserid}, #{ouserid} FROM dual " +
            "WHERE NOT EXISTS (SELECT * FROM friends WHERE cuserid = #{cuserid} AND ouserid = #{ouserid})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertIfNotExists(Friends friends);

    @Select("select * from friends where cuserid=#{cuserid}")
    @Results({
            @Result(column = "id",property = "id"),
            @Result(column = "cuserid",property = "cuserid"),
            @Result(column = "ouserid",property = "ouserid"),
            @Result(column = "ouserid",property = "ouser",javaType = List.class,
                    one = @One(select = "com.example.home_work.mapper.cUserMapper.selectByID")
            ),
    })
    List<Friends> selectOcuser(String cuserid);
}
