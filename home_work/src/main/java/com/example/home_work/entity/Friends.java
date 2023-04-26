package com.example.home_work.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@TableName("friends")
public class Friends {
    private int id;
    private String cuserid;
    private String ouserid;
    private String createDate;
    private String updateDate;

    @TableField(exist = false)
    private List<cUser> ouser;

    public List<cUser> getOuser() {
        return ouser;
    }

    public void setOuser(List<cUser> cuser) {
        this.ouser = cuser;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCuserid() {
        return cuserid;
    }

    public void setCuserid(String cuserid) {
        this.cuserid = cuserid;
    }

    public String getOuserid() {
        return ouserid;
    }

    public void setOuserid(String ouserid) {
        this.ouserid = ouserid;
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
        return "Friends{" +
                "id=" + id +
                ", cuserid='" + cuserid + '\'' +
                ", ouserid='" + ouserid + '\'' +
                ", createDate='" + createDate + '\'' +
                ", updateDate='" + updateDate + '\'' +
                ", ouser=" + ouser +
                '}';
    }
}
