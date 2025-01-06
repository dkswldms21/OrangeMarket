package com.sist.back.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.ChattingService;
import com.sist.back.util.Paging;
import com.sist.back.vo.ChattingEmojiVO;
import com.sist.back.vo.ChattingVO;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@RequiredArgsConstructor
@RestController
public class ChatController {

    @Autowired
    private final SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ChattingService c_serivce;

    @MessageMapping("/chat/message")
    public void sendMessage(ChattingVO message) {
        // if (isJoin(message))
        // message.setMessage(message.getSender() + "님이 입장하였습니다");
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getChatroomkey(), message);
        c_serivce.addChat(message);
        if (message.getChattingimg_url() != "" && message.getChattingimg_url() != null) {
            c_serivce.addImg(message);
        }
    }

    @GetMapping("/chat/adminsend")
    public void adminSend(ChattingVO message) {
        c_serivce.addChat(message);
    }
    
    @GetMapping("/chat/emoticon")
    @ResponseBody
    public Map<String, Object> getEmoticon(String cPage) {
        Map<String, Object> s_map = new HashMap<>();
        Map<String, Object> map = new HashMap<>();
        Paging p = new Paging(4, 4);

        int totalrecord = Integer.parseInt(c_serivce.getCountEmoticon());
        p.setTotalRecord(totalrecord);
        if (cPage != null) {
            p.setNowPage(Integer.parseInt(cPage));
        } else {
            p.setNowPage(1);
        }

        s_map.put("cPage", cPage);
        s_map.put("begin", String.valueOf(p.getBegin()));
        s_map.put("end", String.valueOf(p.getEnd()));

        List<ChattingEmojiVO> list = c_serivce.getEmoticon(s_map);
        ChattingEmojiVO[] ar = null;
        if (list != null && list.size() > 0) {
            ar = new ChattingEmojiVO[list.size()];
            list.toArray(ar);
        }

        map.put("page", p);
        map.put("totalPage", p.getTotalPage());
        map.put("totalRecord", p.getTotalRecord());
        map.put("numPerPage", p.getNumPerPage());
        map.put("emoticons", ar);

        return map;
    }

}