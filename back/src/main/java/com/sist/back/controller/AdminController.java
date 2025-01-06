package com.sist.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.AdminService;
import com.sist.back.service.PostService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/ad")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    PostService postService;

    @GetMapping("/getTotal")
    public Map<String, Object> getTotal() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getTotal", adminService.getTotal());
        return res;
    }

    @GetMapping("/searchYear")
    public Map<String, Object> searchYear() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_searchYear", adminService.searchYear());
        return res;
    }

    @GetMapping("/postOverview")
    public Map<String, Object> postOverview(String year) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_postOverview", adminService.postOverview(year));
        return res;
    }

    @GetMapping("/postStatusCnt")
    public Map<String, Object> postStatusCnt() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_postStatusCnt", adminService.postStatusCnt());
        return res;
    }

    @GetMapping("/userStatusCnt")
    public Map<String, Object> userStatusCnt() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_userStatusCnt", adminService.userStatusCnt());
        return res;
    }

    @GetMapping("/getQnaList")
    public Map<String, Object> getQnaList() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getQnaList", adminService.getQnaList());
        return res;
    }

    @GetMapping("/getUserRank")
    public Map<String, Object> getUserRank() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getUserRank", adminService.getUserRank());
        return res;
    }

    @GetMapping("/getTop4")
    public Map<String, Object> getTop4() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getTop4", postService.getTop4());
        return res;
    }

    @GetMapping("/todayReport")
    public Map<String, Object> todayReport() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_todayReport", adminService.todayReport());
        return res;
    }

    @GetMapping("/dealstatistic")
    public Map<String, Object> dealstatistic() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_dealstatistic", adminService.dealstatistic());
        return res;
    }

    @GetMapping("/catedealstatistic")
    public Map<String, Object> catedealstatistic(String type) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_catedealstatistic", adminService.catedealstatistic(type));
        return res;
    }

    @GetMapping("/postTop10Statistic")
    public Map<String, Object> postTop10Statistic(String type) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_postTop10Statistic", postService.postTop10Statistic(type));
        return res;
    }

}
