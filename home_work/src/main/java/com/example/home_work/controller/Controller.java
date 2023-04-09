package com.example.home_work.controller;

import com.example.home_work.entity.cUser;
import com.example.home_work.mapper.cUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {
    @Autowired
    private cUserMapper cUserMapper;

    @GetMapping("/hello")
    public String hello(){
        //List<cUser> list=cUserMapper.find();
        //System.out.println(list);
        return "hello world  你好世界";
    }
}
