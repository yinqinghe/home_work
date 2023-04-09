package com.example.home_work.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.home_work.entity.WorkCategory;
import com.example.home_work.entity.cUser;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface cUserMapper extends BaseMapper<cUser> {
    @Insert("insert into user values(#{username},#{password},#{age},#{sexual},#{desc})")
    public int register(cUser  cuser);

    @Select("select * from c_user where id=#{cuserid}")
    List<cUser> selectByID(String cuserid);
}
