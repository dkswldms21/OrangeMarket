package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.AdminMapper;
import com.sist.back.vo.QnaVO;
import com.sist.back.vo.categoryVO;
import com.sist.back.vo.admin.DealStatisticVO;
import com.sist.back.vo.admin.PostOverviewVO;
import com.sist.back.vo.admin.TodayReportVO;
import com.sist.back.vo.admin.TotalVO;
import com.sist.back.vo.admin.UserRankVO;
import com.sist.back.vo.admin.UserStatusCntVO;

@Service
public class AdminService {

    @Autowired
    AdminMapper adminMapper;

    public TotalVO getTotal() {
        return adminMapper.getTotal();
    }

    public List<PostOverviewVO> postOverview(String year) {
        return adminMapper.postOverview(year);
    }

    public List<String> searchYear() {
        return adminMapper.searchYear();
    }

    public List<String> postStatusCnt() {
        return adminMapper.postStatusCnt();
    }

    public List<UserStatusCntVO> userStatusCnt() {
        return adminMapper.userStatusCnt();
    }

    public List<QnaVO> getQnaList() {
        return adminMapper.getQnaList();
    }

    public List<UserRankVO> getUserRank() {
        return adminMapper.getUserRank();
    }

    public TodayReportVO todayReport() {
        return adminMapper.todayReport();
    }

    public DealStatisticVO dealstatistic() {
        return adminMapper.dealstatistic();
    }

    public List<categoryVO> catedealstatistic(String type) {
        return adminMapper.catedealstatistic(type);
    }
}
