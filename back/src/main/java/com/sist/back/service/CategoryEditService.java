package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.CategoryEditMapper;
import com.sist.back.vo.categoryVO;

@Service
public class CategoryEditService {
    @Autowired
    CategoryEditMapper mapper;

    public List<categoryVO> deletedAll(){
        return mapper.deletedAll();
    }

    public int addCategory(categoryVO vo){
        return mapper.addCategory(vo);
    }

    public int addCategoryDefault(categoryVO vo){
        return mapper.addCategoryDefault(vo);
    }

    public categoryVO getCategory(String categorykey){
        return mapper.getCategory(categorykey);
    }

    public int editCategory(categoryVO vo){
        return mapper.editCategory(vo);
    }
    
    public int editCategoryDefault(categoryVO vo){
        return mapper.editCategoryDefault(vo);
    }
    public int deleteCategory(String categorykey){
        return mapper.deleteCategory(categorykey);
    }

}
