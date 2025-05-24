package com.oliver.wwwliuyu98824com.service;

import com.oliver.wwwliuyu98824com.Mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    UserMapper userMapper;

    public void saveGrade(String userName,String finalGrade) {
        userMapper.saveGrade(userName,finalGrade);
    }

}
