package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.home_work.entity.UploadImage;
import com.example.home_work.entity.Uploadvideo;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.UploadImageMapper;
import com.example.home_work.mapper.UploadVideoMapper;
import com.example.home_work.mapper.cUserMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
public class UploadFileController {
    private static final String path = "D:\\C#\\Idea\\springboot\\home_work\\src\\main\\resources\\static\\";
    @Autowired
    private cUserMapper cuserMapper;
    @Autowired
    private UploadImageMapper uploadImageMapper;
    @Autowired
    private UploadVideoMapper uploadVideoMapper;

    @ApiOperation(value = "用户上传图片作业或文本",notes = "用户上传图片作业或文本")
    @PostMapping("/update/image")
    public Result updateimage(MultipartFile photo,String token,UploadImage upLoadImage) throws IOException {

        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println(photo.getOriginalFilename());           //获取图片的原始名称
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        byte[] bytes =photo.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".jpg";

        upLoadImage.setImage_url("medias/" + filename);
        upLoadImage.setCuserid(Integer.toString(res.get(0).getId()));
        uploadImageMapper.insert(upLoadImage);
        saveFile(photo, filename);
        return Result.ok();
    }
    @ApiOperation(value = "用户上传视频作业",notes = "用户上传视频作业")
    @PostMapping("/update/video")
    public Result updatevideo(MultipartFile video, String token, Uploadvideo uploadvideo) throws IOException {
        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println(video.getOriginalFilename());           //获取图片的原始名称
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        byte[] bytes =video.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".mp4";

        uploadvideo.setvideo_url("medias/" + filename);
        uploadvideo.setCuserid(Integer.toString(res.get(0).getId()));
        uploadVideoMapper.insert(uploadvideo);
        saveFile(video, filename);
        return Result.ok();
    }

    @ApiOperation(value = "用户上传图片作业或文本",notes = "用户上传图片作业或文本")
    @PostMapping("/upload/image")
    public Result uploadimage(MultipartFile photo,String token,UploadImage upLoadImage) throws IOException {

        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println(photo.getOriginalFilename());           //获取图片的原始名称
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        byte[] bytes =photo.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".jpg";

        upLoadImage.setImage_url("medias/" + filename);
        upLoadImage.setCuserid(Integer.toString(res.get(0).getId()));
        uploadImageMapper.insert(upLoadImage);
        saveFile(photo, filename);
        return Result.ok();
    }
    @ApiOperation(value = "用户上传文本作业",notes = "用户上传文本作业")
    @PostMapping("/upload/text")
    public Result uploadtext(String token,UploadImage upLoadImage) throws IOException {

        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        upLoadImage.setCuserid(Integer.toString(res.get(0).getId()));
        uploadImageMapper.insert(upLoadImage);
        return Result.ok();
    }
    @ApiOperation(value = "用户上传视频作业",notes = "用户上传视频作业")
    @PostMapping("/upload/video")
    public Result uploadvideo(MultipartFile video, String token, Uploadvideo uploadvideo) throws IOException {
        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println(video.getOriginalFilename());           //获取图片的原始名称
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());
        byte[] bytes =video.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".mp4";

        uploadvideo.setvideo_url("medias/" + filename);
        uploadvideo.setCuserid(Integer.toString(res.get(0).getId()));
        uploadVideoMapper.insert(uploadvideo);
        saveFile(video, filename);
        return Result.ok();
    }

    @ApiOperation(value = "用户上传个人头像",notes = "用户上传个人头像")
    @PostMapping("/upload/mypicture")
    public Result upload(MultipartFile photo, String token) throws IOException {
        String username= JwtUtils.getClaimByToken(token).getSubject();
        System.out.println("编辑的用户："+username);           //获取图片的原始名称
        System.out.println(photo.getOriginalFilename());
//        获取文件类型
        System.out.println(photo.getContentType());
        //String path=request.getServletContext().getRealPath("/upload");
        //System.out.println(photo.getName());
        byte[] bytes =photo.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".jpg";
//        更新用户信息
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        cUser cuser=cuserMapper.selectOne(queryWrapper);
        cuser.setPicture("medias/" + filename);
        UpdateWrapper<cUser> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("username", username);
        int rows = cuserMapper.update(cuser, updateWrapper);

        saveFile(photo, filename);
        return Result.ok().data("imageUrl","medias/" + filename);
    }


    public void saveFile(MultipartFile photo, String filename) throws IOException {
        File dir = new File(path);
        if (!dir.exists()) {
            //创建目录
            dir.mkdir();
        }
        File file = new File(path + filename);
        photo.transferTo(file);
    }

}
