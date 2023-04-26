package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.conditions.query.LambdaQueryChainWrapper;
import com.example.home_work.entity.UploadImage;
import com.example.home_work.entity.Uploadvideo;
import com.example.home_work.entity.WorkShare;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.UploadImageMapper;
import com.example.home_work.mapper.UploadVideoMapper;
import com.example.home_work.mapper.WorkShareMapper;
import com.example.home_work.mapper.cUserMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserWorkItemController {
    @Autowired
    private cUserMapper cuserMapper;
    @Autowired
    private UploadImageMapper uploadImageMapper;
    @Autowired
    private UploadVideoMapper uploadvideoMapper;
    @Autowired
    private WorkShareMapper workShareMapper;
    @ApiOperation(value = "用户查看自己分享的作业作品item",notes = "用户查看自己分享的作业作品item")
    @GetMapping("/my/friend/myshare")
    public Result myshare(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        String my_name=res.get(0).getUsername();

        //QueryWrapper<WorkShare> queryWrapper1 = new QueryWrapper<>();        //获取用户的ID值
        //queryWrapper1.eq("can_userid",cuserid);
        List<WorkShare> works =  workShareMapper.myShare(my_name);
        //System.out.println(works);
        for (WorkShare work : works) {
            System.out.println(work.getWorkid());
        }
        return Result.ok().data("data",works);
    }

    @ApiOperation(value = "取消分享作业作品item",notes = "取消分享作业作品item")
    @GetMapping("/my/friend/del_share")
    public Result del_share(String item_id){
        QueryWrapper<WorkShare> queryWrapper = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper.eq("id",item_id);

        int rows=workShareMapper.delete(queryWrapper);
        System.out.println(rows);

        return Result.ok().data("state",rows);
    }

    @ApiOperation(value = "查看好友分享作业作品item",notes = "查看好友分享作业作品item")
    @GetMapping("/my/friend/share")
    public Result see_share(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        String cuserid=Integer.toString(res.get(0).getId());

        //queryWrapper1.eq("can_userid",cuserid);
        List<WorkShare> works =  workShareMapper.selectShare(cuserid);
        System.out.println(works);

        return Result.ok().data("data",works);
    }
    @ApiOperation(value = "用户分享作业作品item",notes = "用户分享作业作品item")
    @PostMapping("/my/share")
    public Result share(String token,WorkShare workShare){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper1 = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper1.eq("username",username);
        List<cUser> res1 = cuserMapper.selectList(queryWrapper1);
        workShare.setAuthor(res1.get(0).getUsername());

        QueryWrapper<WorkShare> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("can_userid",workShare.getCan_userid()).eq("workid",workShare.getWorkid());
        List<WorkShare> res =  workShareMapper.selectList(queryWrapper);
        System.out.println("this res : "+res.toArray().length);
        if (res.toArray().length!=0){
            return Result.ok().data("message","此分享已成功");
        }
        int i = workShareMapper.insert(workShare);
        System.out.println(i);
        return Result.ok().data("message","分享操作成功");
    }
    @ApiOperation(value = "用户搜索作业作品item",notes = "用户搜索作业作品item")
    @GetMapping("/my/search")
    public Result search(String token,String key){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        String cuserid=Integer.toString(res.get(0).getId());

        QueryWrapper<UploadImage> queryImage = new QueryWrapper<>();    //使用ID值获取用户的作品图片信息
        queryImage.eq("cuserid",cuserid).eq("title",  key );
        List<UploadImage> image =uploadImageMapper.selectImageAndCategory_(cuserid,key);

        QueryWrapper<Uploadvideo> queryvideo = new QueryWrapper<>();    //使用ID值获取用户的作品视频信息
        queryvideo.eq("cuserid",cuserid).like("title",  key );
        List<Uploadvideo> video=uploadvideoMapper.selectvideoAndCategory_(cuserid,key);

        System.out.println(image);
        System.out.println(image.toArray().length);
        System.out.println(video);
        System.out.println(key);

        return Result.ok().data("image",image).data("video",video);
    }
    @ApiOperation(value = "获取用户的作业作品item",notes = "获取用户的作业作品item")
    @GetMapping("/cuser/workitems")
    public Result WorkItem(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        String cuserid=Integer.toString(res.get(0).getId());

        QueryWrapper<UploadImage> queryImage = new QueryWrapper<>();    //使用ID值获取用户的作品图片信息
        queryImage.eq("cuserid",cuserid);
        List<UploadImage> image =uploadImageMapper.selectImageAndCategory(cuserid);
        //List<UploadImage> image = uploadImageMapper.selectList(queryImage);

        QueryWrapper<Uploadvideo> queryvideo = new QueryWrapper<>();    //使用ID值获取用户的作品视频信息
        queryvideo.eq("cuserid",cuserid);
        List<Uploadvideo> video=uploadvideoMapper.selectvideoAndCategory(cuserid);

        System.out.println(image);
        System.out.println(image.toArray().length);
        System.out.println(video);
        return Result.ok().data("image",image).data("video",video);
    }

}
