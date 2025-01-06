package com.sist.back.controller;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sist.back.service.DealreviewService;
import com.sist.back.util.Paging;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.ReviewListVO;

@Controller
@RequestMapping("/user")

public class DealreviewController {
    @Autowired
    private DealreviewService d_service;

    @RequestMapping("/allReview")
    @ResponseBody
    public Map<String, Object> allReview(String userkey, String cPage) {
        Map<String, Object> d_map = new HashMap<>();
        
        int totalRecord = d_service.allCount(userkey);
        Paging page = new Paging(5, 3);
        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        } else {
            page.setNowPage(1);
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();
        d_map.put("begin", begin);
        d_map.put("end", end);
        d_map.put("userkey", userkey);

        Map<String, Object> map = new HashMap<>();
        PostVO[] all_ar = d_service.allReview(d_map);
        map.put("all_ar", all_ar);
        map.put("page", page);
        map.put("count", totalRecord);
        return map;
    }

    @RequestMapping("/buyingReview")
    @ResponseBody
    public Map<String, Object> buyingReview(String userkey, String cPage) {
        Map<String, Object> d_map = new HashMap<>();
        
        int totalRecord = d_service.buyingCount(userkey);
        Paging page = new Paging(5, 3);
        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        } else {
            page.setNowPage(1);
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();
        d_map.put("b_begin", begin);
        d_map.put("b_end", end);
        d_map.put("userkey", userkey);

        Map<String, Object> map = new HashMap<>();
        PostVO[] buying_ar = d_service.buyingReview(d_map);
        map.put("buying_ar", buying_ar);
        map.put("b_page", page);
        return map;
    }

    @RequestMapping("/sellingReview")
    @ResponseBody
    public Map<String, Object> sellingReview(String userkey, String cPage) {
        Map<String, Object> d_map = new HashMap<>();

        int totalRecord = d_service.sellingCount(userkey);
        Paging page = new Paging(5, 3);
        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        } else {
            page.setNowPage(1);
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();
        d_map.put("s_begin", begin);
        d_map.put("s_end", end);
        d_map.put("userkey", userkey);

        Map<String, Object> map = new HashMap<>();
        PostVO[] selling_ar = d_service.sellingReview(d_map);
        map.put("selling_ar", selling_ar);
        map.put("s_page", page);
        return map;
    }

    @RequestMapping("/reviewList")
    @ResponseBody
    public Map<String, Object> reviewList(String preference) {
        Map<String, Object> map = new HashMap<>();
        ReviewListVO[] r_ar = d_service.reviewList(preference);
        map.put("r_ar", r_ar);
        return map;
    }

    @RequestMapping("/sellerReview")
    @ResponseBody
    public Map<String, Object> sellerReview(String reviewlistkey, String postkey, String userkey, String estimateuserkey) {
        Map<String, Object> map = new HashMap<>();
        int toPost = d_service.sellerReview(reviewlistkey, postkey);
        int toManner = d_service.addManner(userkey, reviewlistkey, estimateuserkey);
        map.put("toPost", toPost);
        map.put("toManner", toManner);
        return map;
    }

    @RequestMapping("/buyerReview")
    @ResponseBody
    public Map<String, Object> buyerReview(String reviewlistkey, String postkey, String userkey, String estimateuserkey) {
        Map<String, Object> map = new HashMap<>();
        int toPost = d_service.sellerReview(reviewlistkey, postkey);
        int toManner = d_service.addManner(userkey, reviewlistkey, estimateuserkey);
        map.put("toPost", toPost);
        map.put("toManner", toManner);
        return map;
    }

    @RequestMapping("/hideReview")
    @ResponseBody
    public Map<String, Object> hideReview(String postkey) {
        Map<String, Object> map = new HashMap<>();
        int cnt = d_service.hideReview(postkey);
        map.put("cnt", cnt);
        return map;
    }
    
    
}
