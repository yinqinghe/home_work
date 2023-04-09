package com.example.home_work.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.cUserMapper;
import com.example.home_work.utils.JwtUtils;
import com.example.home_work.utils.Result;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Objects;

@RestController
public class LogInOutRegController {
    @Autowired
    private cUserMapper cuserMapper;
    @ApiOperation("新用户注册账号")
    @PostMapping("/register")
    public Result register(cUser cuser) {
        System.out.println("打印cuser   " + cuser.toString());

        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.exists("select id from c_user where username='" + cuser.getUsername() + "'");
        System.out.println("exists:  " + cuserMapper.selectList(queryWrapper));
        //cuser.setSuperuser(false);     //默认创建用户为普通用户
//        cuser.setSuperuser(true);     //创建用户为超级用户
        System.out.println("register_cuser:"+cuser);
        if (cuserMapper.selectList(queryWrapper).isEmpty()) {     //判断注册用户是否存在，如果不存在即创建，
            System.out.println("该数据库没有用户");
            int i = cuserMapper.insert(cuser);
            if (i > 0) {
                return Result.registerSuccess();
            } else {
                return Result.registerError();
            }
        } else {
            System.out.println("已存在该用户名");
            return Result.Exist();
            //return "数据库已存在该用户名";
        }
    }
    @PostMapping("/clogin")
    public Result login1(cUser cuser, HttpServletResponse response) {
        System.out.println("登录用户信息"+cuser.toString());
        //判断账号和密码是否存在且正确
        QueryWrapper<cUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",cuser.getUsername());
        List<cUser> res = cuserMapper.selectList(queryWrapper);
        System.out.println("登录用户信息"+res);
        if (res.isEmpty()) {
            System.out.println("数据库不存在该用户名");
            return Result.noExist();
        } else {
            System.out.println("password:  " + res.get(0).getPassword());
            if(!Objects.equals(cuser.getPassword(), res.get(0).getPassword())){
                return Result.error();
            }else{
                System.out.println("登陆成功");
                String token= JwtUtils.generateToken(cuser.getUsername());
                //boolean role_=res.get(0).isSuperuser();
                //String role=role_?"SuperUser":"normaluser";
                String role="normaluser";
                System.out.println("用户角色  "+role);
                Cookie cookie=new Cookie("token",token);
                cookie.setPath("/");
                cookie.setMaxAge(14*24*60*60);
                cookie.setSecure(false);
                Cookie cookie1=new Cookie("User_role",role);
                response.addCookie(cookie);
                response.addCookie(cookie1);
                return Result.ok().data("token",token).data("userinfo",res);
            }
        }
    }

}
