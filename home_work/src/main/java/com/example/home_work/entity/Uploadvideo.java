package com.example.home_work.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@TableName("work_video")
public class Uploadvideo {
    private int id;
    private String video_url;
    private String cuserid;
    private String title;
    private String content;
    private String createDate;
    private String updateDate;
    private String work_categoryid;
    @TableField(exist = false)
    private List<WorkCategory> workcategory;

    public List<WorkCategory> getWorkcategory() {
        return workcategory;
    }

    public void setWorkcategory(List<WorkCategory> workcategory) {
        this.workcategory = workcategory;
    }

    public String getWork_categoryid() {
        return work_categoryid;
    }

    public void setWork_categoryid(String work_categoryid) {
        this.work_categoryid = work_categoryid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getvideo_url() {
        return video_url;
    }

    public void setvideo_url(String video_url) {
        this.video_url = video_url;
    }

    public String getCuserid() {
        return cuserid;
    }

    public void setCuserid(String cuserid) {
        this.cuserid = cuserid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public String toString() {
        return "Uploadvideo{" +
                "id=" + id +
                ", video_url='" + video_url + '\'' +
                ", cuserid='" + cuserid + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", createDate='" + createDate + '\'' +
                ", updateDate='" + updateDate + '\'' +
                ", work_categoryid='" + work_categoryid + '\'' +
                ", workcategory=" + workcategory +
                '}';
    }
}
