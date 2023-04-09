package com.example.home_work.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.stereotype.Component;

@Component
@TableName("work_category")
public class WorkCategory {
    private int workid;
    private String work_name;

    public int getWorkid() {
        return workid;
    }

    public void setWorkid(int workid) {
        this.workid = workid;
    }

    public String getWork_name() {
        return work_name;
    }

    public void setWork_name(String work_name) {
        this.work_name = work_name;
    }

    @Override
    public String toString() {
        return "WorkCategory{" +
                "workid=" + workid +
                ", work_name='" + work_name + '\'' +
                '}';
    }
}
