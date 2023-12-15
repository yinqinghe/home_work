package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.*;

@RestController
public class UserJudgeController {
    @Autowired
    WorkShareMapper workShareMapper;
    @Autowired
    UploadImageMapper uploadImageMapper;
    @Autowired
    UploadVideoMapper uploadVideoMapper;
    @Autowired
    cUserMapper cuserMapper;

    @ApiOperation(value = "统计用户作品类型比例",notes = "统计用户作品类型比例")
    @GetMapping("/my/type/stat")
    public Result typeStat(String token) throws IOException {
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper1 = new QueryWrapper<>();        //获取用户的ID值
        queryWrapper1.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper1);
        String cuserid=Integer.toString(res.get(0).getId());

        QueryWrapper<UploadImage> queryImage = new QueryWrapper<>();    //使用ID值获取用户的作品图片信息
        queryImage.eq("cuserid",cuserid);
        List<UploadImage> image =uploadImageMapper.selectImageAndCategory(cuserid);
        int i=0;

        for(UploadImage u:image){
            if(!Objects.equals(u.getImage_url(), "") && !Objects.equals(u.getImage_url(), null)){
                i=i+1;
            }
        }
        QueryWrapper<Uploadvideo> queryvideo = new QueryWrapper<>();    //使用ID值获取用户的作品视频信息
        queryvideo.eq("cuserid",cuserid);
        List<Uploadvideo> video=uploadVideoMapper.selectvideoAndCategory(cuserid);
        Map<String, Integer> map = new HashMap<>();
        for (UploadImage ii : image) {
            String categoryId = ii.getWorkcategory().get(0).getWork_name();
            if (map.containsKey(categoryId)) {
                System.out.println(map.get(categoryId));
                if(map.get(ii.getWorkcategory().get(0).getWork_name())==null){
                    map.put(ii.getWorkcategory().get(0).getWork_name(),  1);
                }else{
                    map.put(ii.getWorkcategory().get(0).getWork_name(), map.get(ii.getWorkcategory().get(0).getWork_name()) + 1);
                }
                //map.merge(ii.getWorkcategory().get(0).getWork_name(), 1, Integer::sum);
                System.out.println(ii.getWorkcategory().get(0).getWork_name()+"    ==="+map.get(ii.getWorkcategory().get(0).getWork_name()));
            } else {
                map.put(categoryId, 1);
            }
        }
        for (Uploadvideo iii : video) {
            String categoryId = iii.getWorkcategory().get(0).getWork_name();
            if (map.containsKey(categoryId)) {
                map.merge(iii.getWorkcategory().get(0).getWork_name(), 1, Integer::sum);
            } else {
                map.put(iii.getWorkcategory().get(0).getWork_name(), 1);
            }
        }

        for (String key : map.keySet()) {
            //System.out.println("key"+key);
            int count = map.get(key);
            System.out.println(key + " ============ " + count);
        }

        return Result.ok().data("image",i).data("video",video.size()).data("text",image.size()-i).data("cate",map);
    }
    @ApiOperation(value = "好友评分作品",notes = "好友评分作品")
    @GetMapping("/my/friend/judge")
    public Result judge(String rate, String share_id) throws IOException {
        QueryWrapper<WorkShare> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id",share_id);
        WorkShare workShare = new WorkShare();
        workShare.setJ_rate(rate); // 将字段名和新的值设置到实体对象中

        int result = workShareMapper.update(workShare, queryWrapper);
        System.out.println(result);
        return Result.ok().data("message","作品评价成功");
    }
}
