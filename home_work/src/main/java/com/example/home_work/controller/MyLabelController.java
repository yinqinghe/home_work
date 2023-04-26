package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.home_work.entity.WorkCategory;
import com.example.home_work.entity.WorkShare;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.WorkCategoryMapper;
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
public class MyLabelController {
    @Autowired
    WorkCategoryMapper workCategoryMapper;
    @Autowired
    cUserMapper cuserMapper;

    @ApiOperation(value = "用户添加分类项",notes = "用户添加分类项")
    @PostMapping("/my/label/add")
    public Result addLabel(String token,WorkCategory workCategory){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        workCategory.setCuserid(Integer.toString(res.get(0).getId()));
        workCategoryMapper.insert(workCategory);

        return Result.ok().data("state","successful");
    }
    @ApiOperation(value = "",notes = "取消分享作业作品item")
    @GetMapping("/my/label/mylabel")
    public Result getLabel(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        QueryWrapper<WorkCategory> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("cuserid",res.get(0).getId());
        List<WorkCategory> works=workCategoryMapper.selectList(queryWrapper1);
        System.out.println(works);
        return Result.ok().data("myLabel",works);
    }
    @ApiOperation(value = "用户删除自己的分类项",notes = "用户删除自己的分类项")
    @GetMapping("/my/label/del")
    public Result delLabel(String workid){
        QueryWrapper<WorkCategory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("workid",workid);
        List<WorkCategory> res = workCategoryMapper.selectList(queryWrapper);

        int rows=workCategoryMapper.delete(queryWrapper);
        System.out.println(rows);

        return Result.ok().data("state",rows);
    }

}
