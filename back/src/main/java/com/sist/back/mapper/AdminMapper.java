package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.QnaVO;
import com.sist.back.vo.categoryVO;
import com.sist.back.vo.admin.DealStatisticVO;
import com.sist.back.vo.admin.PostOverviewVO;
import com.sist.back.vo.admin.TodayReportVO;
import com.sist.back.vo.admin.TotalVO;
import com.sist.back.vo.admin.UserRankVO;
import com.sist.back.vo.admin.UserStatusCntVO;

@Mapper
public interface AdminMapper {
    TotalVO getTotal();

    List<PostOverviewVO> postOverview(String year);

    List<String> searchYear();

    List<String> postStatusCnt();

    List<UserStatusCntVO> userStatusCnt();

    List<QnaVO> getQnaList();

    List<UserRankVO> getUserRank();

    TodayReportVO todayReport();

    DealStatisticVO dealstatistic();

    List<categoryVO> catedealstatistic(String type);
}
