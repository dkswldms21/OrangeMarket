package com.sist.back.controller;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.dto.ChatRoomWithImgUrlDTO;
import com.sist.back.dto.ChatRoomWithPostDTO;
import com.sist.back.repository.ChatRoomRepository;
import com.sist.back.service.ChatRoomService;
import com.sist.back.service.PostService;
import com.sist.back.service.UserService;
import com.sist.back.vo.ChatRoomVO;
import com.sist.back.vo.ChattingVO;
import com.sist.back.vo.PostImgVO;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.userVO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class ChatRoomController {

    @Autowired
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatRoomService cr_service;

    @Autowired
    private UserService u_service;

    @Autowired
    private PostService p_service;

    @GetMapping("/chat/rooms-all")
    public String getAllRooms() {
        return "/chat/home";
    }

    @RequestMapping("/chat/rooms")
    @ResponseBody
    public ChatRoomWithImgUrlDTO getRooms(String userkey) {
        List<ChatRoomVO> list = chatRoomRepository.findAll(userkey);
        List<String> anotherkeys = list.stream()
                .map(chatRoom -> {
                    if (!userkey.equals(chatRoom.getBuyer_userkey())) {
                        return chatRoom.getBuyer_userkey();
                    } else {
                        return chatRoom.getSeller_userkey();
                    }
                })
                .collect(Collectors.toList());
        List<userVO> user_list = anotherkeys.stream()
                .map(u_service::getUserInfo)
                .collect(Collectors.toList());

        userVO my_info = u_service.getUserInfo(userkey);
        return new ChatRoomWithImgUrlDTO(list,user_list,my_info);
    }

    @RequestMapping("/chat/createroom")
    public ChatRoomVO createRoom(ChatRoomVO cvo) {
        cr_service.createRoom(cvo);
        return cvo;
    }

    @GetMapping("/chat/room/{chatroomkey}")
    @ResponseBody // PathVariable로 {chatroomkey}에 해당하는 값을 String chatroomkey에 바인딩
    public ChatRoomWithPostDTO getRoom(@PathVariable String chatroomkey) {
        String postkey = cr_service.searchPostkey(chatroomkey);
        PostImgVO pvo = p_service.getPostImgThumbnail(postkey);
        List<ChattingVO> list = chatRoomRepository.findById(chatroomkey);

        return new ChatRoomWithPostDTO(list, pvo);
    }
}
