package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.home_work.entity.UploadImage;
import com.example.home_work.entity.Uploadvideo;
import com.example.home_work.entity.admin;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.AdminMapper;
import com.example.home_work.mapper.UploadImageMapper;
import com.example.home_work.mapper.UploadVideoMapper;
import com.example.home_work.mapper.cUserMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@CrossOrigin
@RestController
public class AdminController {
    @Autowired
    private AdminMapper adminMapper;
    @Autowired
    private cUserMapper cUserMapper;
    @Autowired
    private UploadImageMapper uploadImageMapper;
    @Autowired
    private UploadVideoMapper uploadvideoMapper;
    @ApiOperation(value = "获取所有用户信息")
    @PostMapping("/admin/login")
    public Result login(@RequestBody admin admin, HttpServletResponse response){
        //判断账号和密码是否存在且正确
        System.out.println(admin);
        System.out.println(admin.getUsername());
        QueryWrapper<admin> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",admin.getUsername());
        List<admin> res = adminMapper.selectList(queryWrapper);
        System.out.println("登录用户信息"+res);
        String token= JwtUtils.generateToken(admin.getUsername());
        return Result.ok().data("token",token).data("userinfo",res);
        //return res;
    }
    @GetMapping("/admin/info")
    public Result info(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();
        return Result.ok().data("name",username);
    }
    @GetMapping("/admin/allUser")
    public Result allUser(String token){
        String username= JwtUtils.getClaimByToken(token).getSubject();

        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        List<cUser> res = cUserMapper.selectList(queryWrapper);
        System.out.println("登录用户信息"+res);
        return Result.ok().data("userinfo",res);
        //return res;
    }
    @GetMapping("/admin/delUser")
    public Result delUser(String token,String username){
        String username_= JwtUtils.getClaimByToken(token).getSubject();

        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        int res = cUserMapper.delete(queryWrapper);
        System.out.println("删除操作状态"+res);
        return Result.ok().data("state",res);
        //return res;
    }
    @GetMapping("/admin/allWork")
    public Result allWork(String token){
        QueryWrapper<UploadImage> queryImage = new QueryWrapper<>();    //使用ID值获取用户的作品图片信息
        List<UploadImage> image =uploadImageMapper.selectImageAndCategory_admin();

        QueryWrapper<Uploadvideo> queryvideo = new QueryWrapper<>();    //使用ID值获取用户的作品视频信息
        List<Uploadvideo> video=uploadvideoMapper.selectvideoAndCategory_admin();

        System.out.println(image);
        System.out.println(image.toArray().length);
        System.out.println(video);
        return Result.ok().data("image",image).data("video",video);
        //return res;
    }
}
