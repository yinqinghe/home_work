package com.example.home_work.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@TableName("work_share")
public class WorkShare {
    private int id;
    private String createDate;
    private String updateDate;
    private String workid;
    private String can_userid;
    private String author;
    private String j_content;
    private String j_rate;

    @TableField(exist = false)
    private List<UploadImage> workid_d;

    public String getJ_content() {
        return j_content;
    }

    public void setJ_content(String j_content) {
        this.j_content = j_content;
    }

    public String getJ_rate() {
        return j_rate;
    }

    public void setJ_rate(String j_rate) {
        this.j_rate = j_rate;
    }

    public List<UploadImage> getWorkid_d() {
        return workid_d;
    }

    public void setWorkid_d(List<UploadImage> workid_d) {
        this.workid_d = workid_d;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getWorkid() {
        return workid;
    }

    public void setWorkid(String workid) {
        this.workid = workid;
    }

    public String getCan_userid() {
        return can_userid;
    }

    public void setCan_userid(String can_userid) {
        this.can_userid = can_userid;
    }

    @Override
    public String toString() {
        return "WorkShare{" +
                "id=" + id +
                ", createDate='" + createDate + '\'' +
                ", updateDate='" + updateDate + '\'' +
                ", workid='" + workid + '\'' +
                ", can_userid='" + can_userid + '\'' +
                ", author='" + author + '\'' +
                ", j_content='" + j_content + '\'' +
                ", j_rate='" + j_rate + '\'' +
                ", workid_d=" + workid_d +
                '}';
    }
}
