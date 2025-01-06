package com.sist.back.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.TownService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/town")
public class TownController {

    @Autowired
    TownService townService;

    @GetMapping("/postside")
    public Map<String, Object> getMethodName(String key, String value, String[] now) {
        Map<String, Object> pMap = new HashMap<>();
        pMap.put("key", key);
        pMap.put("value", value);
        pMap.put("now", now);
        Map<String, Object> res = new HashMap<>();
        res.put("res_list", townService.searchTownByRegion(pMap));
        return res;
    }

    @GetMapping("/getNearTown")
    public Map<String, Object> getNearTown(@RequestParam String region1, @RequestParam String region2) {
        Map<String, Object> res = new HashMap<>();
        res.put("getNearTown", townService.getNearTown(region1, region2));
        return res;
    }

    @GetMapping("/getAllRegion1")
    public Map<String, Object> getAllRegion1() {
        Map<String, Object> res = new HashMap<>();
        res.put("getAllRegion1", townService.getAllRegion1());
        return res;
    }

    @GetMapping("/getAllRegion2")
    public Map<String, Object> getAllRegion2(String region1) {
        Map<String, Object> res = new HashMap<>();
        res.put("getAllRegion2", townService.getAllRegion2(region1));
        return res;
    }

    @GetMapping("/getAllRegion3")
    public Map<String, Object> getAllRegion3(String region2) {
        Map<String, Object> res = new HashMap<>();
        res.put("getAllRegion3", townService.getAllRegion3(region2));
        return res;
    }
}
