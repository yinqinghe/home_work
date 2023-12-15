package com.example.home_work.utils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.extension.conditions.update.LambdaUpdateChainWrapper;
import com.example.home_work.entity.UploadImage;
import com.example.home_work.entity.Uploadvideo;
import com.example.home_work.entity.WorkShare;
import com.example.home_work.mapper.UploadImageMapper;
import com.example.home_work.mapper.UploadVideoMapper;
import com.example.home_work.mapper.WorkShareMapper;
import com.example.home_work.mapper.cUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class MyTaskScheduler {
    @Autowired
    private WorkShareMapper workShareMapper;
    @Autowired
    private cUserMapper cuserMapper;
    @Autowired
    private UploadImageMapper uploadImageMapper;
    @Autowired
    private UploadVideoMapper uploadVideoMapper;

    @Transactional
    @Scheduled(fixedRate = 120000)
    public void myTask() {
        LocalDateTime currentTime = LocalDateTime.now();
        System.out.println("Current time: " + currentTime);
        System.out.println("函数执行");

        QueryWrapper<WorkShare> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("author","18536384334").select("workid", "AVG(j_rate) as j_rate_avg").groupBy("workid").having("workid is not null"); ;
        List<WorkShare> res =workShareMapper.selectList(queryWrapper);
        System.out.println("res+++++++++"+res);
        QueryWrapper<WorkShare> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("author","18536384334").select("videoid", "AVG(j_rate) as j_rate_avg").groupBy("videoid").having("videoid is not null"); ;
        List<WorkShare> res1 =workShareMapper.selectList(queryWrapper1);
        System.out.println("res1+++++++++"+res1);
        // 然后，根据workid分组计算j_rate的平均值
        if(!CollectionUtils.isEmpty(res)) {
            QueryWrapper<WorkShare> groupWrapper = new QueryWrapper<>();
            //Create a new QueryWrapper object to filter the workid field in the WorkShare table
            groupWrapper.in("workid", res.stream().map(WorkShare::getWorkid).collect(Collectors.toList()));
            groupWrapper.select("workid", "avg(j_rate) as j_rate_avg");
            groupWrapper.groupBy("workid");
            List<Map<String, Object>> result = workShareMapper.selectMaps(groupWrapper);
            System.out.println(result);

            // 将计算结果更新到数据库中
            for (Map<String, Object> item : result) {
                LambdaUpdateChainWrapper<UploadImage> updateLambda = new LambdaUpdateChainWrapper<>(uploadImageMapper);
                updateLambda.eq(UploadImage::getId, item.get("workid"))
                        .set(UploadImage::getRate, item.get("j_rate_avg"))
                        .update();
            }
            QueryWrapper<WorkShare> groupWrapper1 = new QueryWrapper<>();
            //Create a new QueryWrapper object to filter the workid field in the WorkShare table
            groupWrapper1.in("videoid", res1.stream().map(WorkShare::getVideoid).collect(Collectors.toList()));
            groupWrapper1.select("videoid", "avg(j_rate) as j_rate_avg");
            groupWrapper1.groupBy("videoid");
            List<Map<String, Object>> result1 = workShareMapper.selectMaps(groupWrapper1);
            for (Map<String, Object> item : result1) {
                LambdaUpdateChainWrapper<Uploadvideo> updateLambda = new LambdaUpdateChainWrapper<>(uploadVideoMapper);
                updateLambda.eq(Uploadvideo::getId, item.get("videoid"))
                        .set(Uploadvideo::getRate, item.get("j_rate_avg"))
                        .update();
            }
        }
    }
}
