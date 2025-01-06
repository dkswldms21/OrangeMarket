package com.sist.back.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.ChattingEmojiVO;
import com.sist.back.vo.ChattingVO;

@Mapper
public interface ChattingMapper {
    int addChat(ChattingVO message);

    int addImg(ChattingVO message);

    List<ChattingVO> findChatRoom(String chatroomkey);

    List<ChattingEmojiVO> getEmoticon(Map<String, Object> map);

    String getCountEmoticon();
}
