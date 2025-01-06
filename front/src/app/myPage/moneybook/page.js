'use client'

import { Box, Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "/public/css/moneybook.css";


export default function page() {

    const userkey = Cookies.get("userkey");
    const today = new Date();
    
    var todayMonth = (today.getMonth()+1).toString();
    if(todayMonth.length==1){
        todayMonth = "0"+todayMonth;
    }
    const todayYYYYMM = today.getFullYear()+"-"+todayMonth;

    const [yyyymm, setYyyymm] = useState(todayYYYYMM);

    const [dateList, setDateList] = useState([]);

    const [userVO, setUserVO] = useState({});

    const [userSell, setUserSell] = useState([]);
    const [userBuy, setUserBuy] = useState([]);
    const [userGive, setUserGive] = useState([]);
    const [userGet, setUserGet] = useState([]);

    const [neighbor, setNeighbor] = useState([]);
    const [neighborTrade, setNeighborTrade] = useState([]);
    const [neighborGive, setNeighborGive] = useState([]);
    
    function priceFormat(price){
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getTotalPrice(postList){
        const length = postList.length;
        var totalPrice = 0;
        for(var i=0; i<length; i++){
            totalPrice += parseInt(postList[i].lastprice);
        }
        return totalPrice;
    }

    function getDateList(create_dtm){
        var tmpDateList = [];
        var regDate = new Date(create_dtm);
        var nowDate = new Date();
        var regYear = regDate.getFullYear();
        var regMonth = regDate.getMonth()+1;
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getMonth()+1;
        var dateVal = "";
        var dateTxt = "";
        var jMonth = "";
        for(var i = regYear; i<= nowYear;i++){
            if(regYear==nowYear){
                    
                for(var j = regMonth; j<= nowMonth;j++){
                    if(j<10){
                        jMonth = "0"+j;
                    } else{
                        jMonth = j;
                    }
                    dateVal = `${i}-${jMonth}`;
                    dateTxt = `${i}년 ${jMonth}월`;
                    tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                }
            }
            else{
                if(i==regYear){
                    for(var j = regMonth; j<= 12;j++){
                        if(j<10){
                            jMonth = "0"+j;
                        } else{
                            jMonth = j;
                        }
                        dateVal = `${i}-${jMonth}`;
                        dateTxt = `${i}년 ${jMonth}월`;
                        tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                    }
                } else if(i == nowYear){
                    for(var j = 1; j<= nowMonth;j++){
                        if(j<10){
                            jMonth = "0"+j;
                        } else{
                            jMonth = j;
                        }
                        dateVal = `${i}-${jMonth}`;
                        dateTxt = `${i}년 ${jMonth}월`;
                        tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                    }
                } else {
                    for(var j = 1; j<= 12;j++){
                        if(j<10){
                            jMonth = "0"+j;
                        } else{
                            jMonth = j;
                        }
                        dateVal = `${i}-${jMonth}`;
                        dateTxt = `${i}년 ${jMonth}월`;
                        tmpDateList.push({"dateVal":dateVal,"dateTxt":dateTxt});
                    }
                }
        }
        }
        setDateList(tmpDateList);
    }

    useEffect(()=>{
        axios.get("/user/moneybook/getInfos",
            {
                params: {
                    userkey: userkey,
                    today: yyyymm,
                }
            }
        ).then((result)=>{
            setUserVO(result.data.uvo);
            setUserSell(result.data.b_list);
            setUserBuy(result.data.s_list);
            setUserGive(result.data.gi_list);
            setUserGet(result.data.ge_list);
            setNeighbor(result.data.n_list);
            setNeighborTrade(result.data.nt_list);
            setNeighborGive(result.data.ng_list);

            getDateList(result.data.uvo.create_dtm);

            
        })
    },[yyyymm]); 

    return (
        <div className="moneybookBody">
            <div className="userInfo">
                <div className="profile">
                    <div className="pfp_txt">
                        <p>{userVO.nickname}님의</p>
                        <p>가계부</p>
                        <Box className="datePicker">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="yyyymm"
                                value={yyyymm}
                                onChange={(e)=>setYyyymm(e.target.value)}
                            >
                                {dateList.length>0 ? dateList.map((date,index)=>{
                                    return(
                                        <MenuItem key={index} value={date.dateVal}>{date.dateTxt}</MenuItem>
                                    )
                                }) : <MenuItem value={todayYYYYMM}>{`${today.getFullYear()}년 ${todayMonth}월`}</MenuItem>
                            }
                            </Select>
                        </FormControl>
                        </Box>
                    </div>
                    <div className="pfp_img">
                        <img src={userVO.imgurl}/>
                    </div>
                </div>
            </div>
            <div className="userTrade">
                <div className="titleRow">
                    <div className="title"> 전체거래 </div>
                    <div className="toRight">{priceFormat(getTotalPrice(userSell)-getTotalPrice(userBuy))}원</div>
                </div>
                <div className="sellRow">
                    <div className="rowTitle toCenter">
                        판매
                    </div>
                    <div className="toCenter">
                        {userSell.length}건
                    </div>
                    <div className="toRight">
                        {userSell.length>0 ? priceFormat(getTotalPrice(userSell)):0}원
                    </div>
                </div>
                <div className="buyRow">
                    <div className="rowTitle toCenter">
                        구매
                    </div>
                    <div className="toCenter">
                        {userBuy.length}건
                    </div>
                    <div className="toRight">
                        {userBuy.length>0 ? priceFormat(getTotalPrice(userBuy)):0}원
                    </div>
                </div>
                <div className="giveRow">
                    <div className="rowTitle toCenter">
                        나눔
                    </div>
                    <div className="toCenter">
                        한 {userGive.length}건
                    </div>
                    <div className="toRight">
                        받은 {userGet.length}건
                    </div>
                </div>
            </div>
            <Divider className="divider"/>
            <div className="neighborTrade">
                <div className="titleRow">
                    <div className="title">이웃</div>
                    <div className="toRight">
                        {neighbor.length}명
                    </div>
                </div>
                <div className="tradeRow">
                    <div className="rowTitle toCenter">
                        거래
                    </div>
                    <div className="toCenter">
                        {neighborTrade.length}건
                    </div>
                    <div className="toRight">
                        {neighborTrade.length>0 ? priceFormat(getTotalPrice(neighborTrade)):0}원
                    </div>
                </div>
                <div className="shareRow">
                    <div className="rowTitle toCenter">
                        나눔
                    </div>
                    <div></div>
                    <div className="toRight">
                        {neighborGive.length}건
                    </div>
                </div>
            </div>
        </div>
    )
}
