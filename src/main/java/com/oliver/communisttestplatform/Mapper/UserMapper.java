package com.oliver.wwwliuyu98824com.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.bind.annotation.RequestParam;

@Mapper
public interface UserMapper {
    void saveGrade(@RequestParam("userName") String userName,
                   @RequestParam("finalGrade") String finalGrade);
}
