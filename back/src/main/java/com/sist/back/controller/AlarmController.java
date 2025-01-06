package com.sist.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.sist.back.service.AlarmService;
import com.sist.back.vo.AlarmVO;

import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class AlarmController {
    @Autowired
    private AlarmService a_service;

    @RequestMapping("/alarm")
    public ResponseEntity<List<AlarmVO>> getMethodName(String userkey) {
        List<AlarmVO> list = a_service.getAlarmForUser(userkey);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
}
