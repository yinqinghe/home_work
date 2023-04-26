package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
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
import org.apache.ibatis.jdbc.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
public class UploadFileController {
    private static final String path = "D:\\C#\\Idea\\springboot\\home_work\\src\\main\\resources\\static\\";
    @Autowired
    private cUserMapper cuserMapper;
    @Autowired
    private UploadImageMapper uploadImageMapper;
    @Autowired
    private UploadVideoMapper uploadVideoMapper;
    @Autowired
    private WorkShareMapper workShareMapper;

    @ApiOperation(value = "用户修改文本作业",notes = "用户修改文本作业")
    @GetMapping("/delete/works")
    public Result delWorks( String workid,boolean isPic) throws IOException {
        if(isPic){
            QueryWrapper<UploadImage> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("id",workid);
            QueryWrapper<WorkShare> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("workid",workid);
            int res=uploadImageMapper.delete(queryWrapper);
            int res1=workShareMapper.delete(queryWrapper1);
            return Result.ok().data("status",res).data("status1",res1);

        }else{
            QueryWrapper<Uploadvideo> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("id",workid);
            QueryWrapper<WorkShare> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("videoid",workid);
            int res=uploadVideoMapper.delete(queryWrapper);
            int res1=workShareMapper.delete(queryWrapper1);
            return Result.ok().data("status",res).data("status1",res1);
        }

    }
    @ApiOperation(value = "用户修改视频文本作业",notes = "用户修改视频文本作业")
    @PostMapping("/update/Vtext")
    public Result updateTextVideo( Uploadvideo uploadvideo) throws IOException {

        System.out.println(uploadvideo);
        QueryWrapper<Uploadvideo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id",uploadvideo.getId());
        List<Uploadvideo> res = uploadVideoMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());

        uploadVideoMapper.update(uploadvideo,queryWrapper);

        return Result.ok();
    }
    @ApiOperation(value = "用户修改文本作业",notes = "用户修改文本作业")
    @PostMapping("/update/text")
    public Result updateText( UploadImage upLoadImage,boolean isVideo) throws IOException {

        System.out.println(upLoadImage);
        QueryWrapper<UploadImage> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id",upLoadImage.getId());
        List<UploadImage> res = uploadImageMapper.selectList(queryWrapper);

        System.out.println("查询结果："+ res.get(0).getId());

        uploadImageMapper.update(upLoadImage,queryWrapper);

        return Result.ok();
    }
    @ApiOperation(value = "用户修改图片作业",notes = "用户修改图片作业")
    @PostMapping("/update/image")
    public Result updateimage(MultipartFile photo, UploadImage upLoadImage) throws IOException {

        QueryWrapper<UploadImage> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id",upLoadImage.getId());
        List<UploadImage> res = uploadImageMapper.selectList(queryWrapper);

        byte[] bytes =photo.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".jpg";
        String regex = "src=\\\"(.[^\\\"]*)";
        Matcher matcher = Pattern.compile(regex).matcher(upLoadImage.getContent());

        if (matcher.find()) {
            String group = matcher.group(1);
            System.out.println(group);
            String result = upLoadImage.getContent().replaceAll(group, "http://127.0.0.1:8888/medias/" + filename+"\" style=\"height:200px;width:210px");
            System.out.println("++++++++++++--------"+result);
            upLoadImage.setContent(result);
        }
        upLoadImage.setImage_url("medias/" + filename);
        System.out.println("-----------+++++++++++++"+upLoadImage);
        uploadImageMapper.update(upLoadImage,queryWrapper);
        saveFile(photo, filename);
        return Result.ok();
    }
    @ApiOperation(value = "用户更改视频作业",notes = "用户更改视频作业")
    @PostMapping("/update/video")
    public Result updatevideo(MultipartFile video, Uploadvideo uploadvideo) throws IOException {
        QueryWrapper<Uploadvideo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id",uploadvideo.getId());
        List<Uploadvideo> res = uploadVideoMapper.selectList(queryWrapper);
        byte[] bytes =video.getOriginalFilename().getBytes();
        String encoded = Base64.getEncoder().encodeToString(bytes);
        String filename = encoded.substring(0, 18)+".mp4";
        saveFile(video, filename);

        uploadvideo.setvideo_url("medias/" + filename);
        uploadVideoMapper.update(uploadvideo,queryWrapper);
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

        String regex = "src=\\\"(.[^\\\"]*)";
        Matcher matcher = Pattern.compile(regex).matcher(upLoadImage.getContent());

        if (matcher.find()) {
            String group = matcher.group(1);
            System.out.println(group);
            String result = upLoadImage.getContent().replaceAll(group, "http://127.0.0.1:8888/medias/" + filename+"\" style=\"height:200px;width:210px");
            System.out.println(result);
            upLoadImage.setContent(result);
        }
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
        saveFile(video, filename);

        uploadvideo.setvideo_url("medias/" + filename);
        uploadvideo.setCuserid(Integer.toString(res.get(0).getId()));
        uploadVideoMapper.insert(uploadvideo);
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
