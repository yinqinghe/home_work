package com.example.home_work.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.cUserMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserinfoController {
    @Autowired
    private cUserMapper cuserMapper;
    @ApiOperation(value = "获取所有用户信息")
    @GetMapping("/all/user")
    public List<cUser> allUser(){
        //String username= JwtUtils.getClaimByToken(token).getSubject();
        //System.out.println("登录用户："+username);
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        //queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        System.out.println("查询结果："+res);
        return res;
    }





    @ApiOperation(value = "获取登录用户信息")
    @GetMapping("/cuser/info")
    public List<cUser> user_Info(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println("登录用户："+username);
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        System.out.println("查询结果："+res);
        return res;
    }
    @PostMapping("/update/userinfo")
    public Result upUserinfo(cUser cuser,String token) {
        System.out.println(token);
        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println("编辑的用户："+username);
//        更新用户信息
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        int res = cuserMapper.update(cuser,queryWrapper);
        return Result.ok();
    }


}
