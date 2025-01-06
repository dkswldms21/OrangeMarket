package com.sist.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.CategoryMapper;
import com.sist.back.vo.categoryVO;

@Service
public class CategoryService {
    
    @Autowired
    CategoryMapper mapper;

    public categoryVO[] all(){
        return mapper.all();
    }
}
