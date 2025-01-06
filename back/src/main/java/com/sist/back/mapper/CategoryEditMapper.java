package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.categoryVO;

@Mapper
public interface CategoryEditMapper {
    
    List<categoryVO> deletedAll();

    int addCategory(categoryVO vo);

    int addCategoryDefault(categoryVO vo);

    categoryVO getCategory(String categorykey);

    int editCategory(categoryVO vo);

    int editCategoryDefault(categoryVO vo);

    int deleteCategory(String categorykey);

}
