package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.home_work.entity.Friends;
import com.example.home_work.entity.UploadImage;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.FriendsMapper;
import com.example.home_work.mapper.cUserMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class UserFriendsController {
    @Autowired
    private FriendsMapper friendsMapper;
    @Autowired
    private cUserMapper cuserMapper;

    @ApiOperation(value = "用户添加好友",notes = "用户添加好友")
    @PostMapping("/friend/add")
    public Result addFriend(String token, Friends friends,String friend_name) throws IOException {

        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        QueryWrapper<cUser> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("username",friend_name);
        List<cUser> friend = cuserMapper.selectList(queryWrapper1);
        if(friend.size()==0){                           //检查添加的用户是否存在
            //System.out.println(friend.size());
            return Result.Error().data("message","添加的好友不存在");
        }
        System.out.println("查询结果："+ res.get(0).getId());
        friends.setCuserid(Integer.toString(res.get(0).getId()));
        friends.setOuserid(Integer.toString(friend.get(0).getId()));
        Integer count = friendsMapper.countByField1AndField2(friends);
        if (count == 0) {
            friendsMapper.insertIfNotExists(friends);
            return Result.ok().data("message","创建的好友项成功");
        }
        else{
            System.out.println("创建 的好友项以存在");
            return Result.Error().data("message","创建的好友项以存在");

        }
    }
    @ApiOperation(value = "用户删除好友",notes = "用户删除好友")
    @GetMapping("/friend/delete")
    public Result delete(String token,String id) throws IOException {
        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);

        Integer count = friendsMapper.deleteById(id);
        //if (count == 0) {
        //    return Result.ok().data("message","好友删除成功");
        //}
        return Result.ok().data("message","好友删除成功");
    }
    @ApiOperation(value = "获取用户好友列表",notes = "获取用户好友列表")
    @GetMapping("/friend")
    public Result getFriend(String token) throws IOException {

        String username= JwtUtils.getClaimByToken(token).getSubject();
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        System.out.println("查询结果："+ res.get(0).getId());

        QueryWrapper<Friends> queryWrapper1 = new QueryWrapper<>();          //在好友表里查询该用户的好友
        queryWrapper1.eq("cuserid",res.get(0).getId());
        List<Friends> friends = friendsMapper.selectOcuser(String.valueOf(res.get(0).getId()));
        System.out.println(friends);
        return Result.ok().data("friends",friends);
    }
}
