package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.home_work.entity.WorkShare;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.WorkShareMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class UserJudgeController {
    @Autowired
    WorkShareMapper workShareMapper;

    @ApiOperation(value = "好友评分作品",notes = "好友评分作品")
    @GetMapping("/my/friend/judge")
    public Result delete(String rate, String share_id) throws IOException {
        QueryWrapper<WorkShare> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id",share_id);
        WorkShare workShare = new WorkShare();
        workShare.setJ_rate(rate); // 将字段名和新的值设置到实体对象中

        int result = workShareMapper.update(workShare, queryWrapper);
        System.out.println(result);
        return Result.ok().data("message","作品评价成功");
    }
}
