package com.sist.back.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.ChattingMapper;
import com.sist.back.vo.ChattingEmojiVO;
import com.sist.back.vo.ChattingVO;

@Service
public class ChattingService {
    @Autowired
    private ChattingMapper mapper;

    private final DBChangeService databaseChangeService;

    @Autowired
    public ChattingService(DBChangeService databaseChangeService) {
        this.databaseChangeService = databaseChangeService;
    }

    public int addChat(ChattingVO message) {
        String chatroomkey = message.getChatroomkey();
        String redirection = "/chat/room/"+chatroomkey;
        String userkey = message.getUserkey2();
        databaseChangeService.onDatabaseChange(redirection,"대화 상대:"+message.getUserkey2()+",대화 내용:"+message.getContent(),"채팅", userkey);
        return mapper.addChat(message);
    }

    public int addImg(ChattingVO message){
        return mapper.addImg(message);
    }

    public List<ChattingVO> findChatRoom(String chatroomkey) {
        return mapper.findChatRoom(chatroomkey);
    }

    public List<ChattingEmojiVO> getEmoticon(Map<String, Object> map){
        return mapper.getEmoticon(map);
    }

    public String getCountEmoticon(){
        return mapper.getCountEmoticon();
    }
}
