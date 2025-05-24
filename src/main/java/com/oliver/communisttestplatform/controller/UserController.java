/*
 * Copyright 2013-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.oliver.wwwliuyu98824com.controller;

import com.oliver.wwwliuyu98824com.dao.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(value = "/getUsers",method = RequestMethod.GET)
    @ResponseBody
    /*
     * List 里的对象是Map对象，而Map对象是
     * 由一个String类型的键和Object类型的值组成
     * */
    public List<Map<String,Object>> getUsers(){
        String sql="select * from User";//SQL查询语句
        List<Map<String,Object>> list=jdbcTemplate.queryForList(sql);
        return list;
    }

//    // http://127.0.0.1:8080/hello?name=lisi
    @RequestMapping("/saveGrade")
    @ResponseBody
    public void saveGrade(@RequestParam("userName") String userName,
                          @RequestParam("finalGrade") String finalGrade) {
        String sql="INSERT INTO user (user_name,final_grade) VALUES ("+userName+","+finalGrade+")";
        System.out.println(sql);
        jdbcTemplate.execute(sql);
    }

    // http://127.0.0.1:8080/user
    @RequestMapping("/user")
    @ResponseBody
    public User user() {
        User user = new User();
        return user;
    }


}
