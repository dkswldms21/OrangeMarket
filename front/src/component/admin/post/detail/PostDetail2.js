"use client";

import { useEffect, useState } from "react";
import "/public/css/admin/post.css";
import "/public/css/admin/post/detail.css";
import "/public/css/admin/user.css";
import axios from "axios";
import PostInfo from "@/component/admin/post/detail/PostInfo";
import CategoryInfo from "@/component/admin/post/detail/CategoryInfo";
import UserreviewInfo from "@/component/admin/post/detail/UserreviewInfo";
import ChatroomInfo from "@/component/admin/post/detail/ChatroomInfo";
import UserInfo from "@/component/admin/post/detail/UserInfo";
import TownInfo from "@/component/admin/post/detail/TownInfo";
import OfferInfo from "@/component/admin/post/detail/OfferInfo";
import { Box, Grid, Modal } from "@mui/material";
import ImageModal from "@/component/admin/post/detail/ImageModal";

export default function PostDetail2(props) {

  const closePostDetail = props.closePostDetail;
  const openPD = props.openPD;


  const [postkey, setPostkey] = useState("");
  const [pvo, setPvo] = useState({});
  const [tvo, setTvo] = useState({});
  const [o_list, setO_list] = useState([]);
  const [cr_list, setCr_list] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [open, setOpen] = useState(false);
  const [imgurl, setImgurl] = useState("");
  function handleOpen(imgurl) {
    setImgurl(imgurl);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const API_URL = "/adpost/detail";

  function getPostDetail(p_key) {
    axios({
      url: API_URL,
      method: "post",
      params: { postkey: p_key },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setPvo(response.data.pvo);
      setTvo(response.data.tvo);
      setO_list(response.data.o_list);
      setCr_list(response.data.cr_list);
      setLoaded(response.data.pvo!=null);
    });
  }

  useEffect(() => {
    setPostkey(props.postkey);
    getPostDetail(props.postkey);
  }, [openPD]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    maxHeight: '80vh', // 최대 높이 설정 (뷰포트 높이의 80%)
    overflowY: 'auto',  // 세로 스크롤 추가
    bgcolor: 'background.paper',
    border: '2px solid #blue',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={openPD}
      onClose={closePostDetail}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div id="wrap">
        <style jsx>{`
          #wrap {
            margin: 0 auto;
            max-width: 1200px;
          }

          #container {
            margin: 0 auto;
            padding-left: 20px;
          }
        `}</style>

    <div id="content">
      
      <div className="section" id="QA_register2">
        <div className="mToggleBar eToggle selected" id="basic">
          <h2 className="eToggleTitle">기본 정보</h2>
        </div>
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <form id="editForm" name="editForm" action="#" method="post">
              <table summary="회원 기본 정보">
                <caption>회원 기본 정보</caption>
                <colgroup>
                  <col className="product" />
                  <col style={{ width: "auto" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">유저번호</th>
                    <td>
                      <span
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ width: "400px", display: "inline-block" }}
                      >
                        {pvo.uvo ? pvo.uvo.userkey : ""}
                      </span>
                    </td>

                  </tr>
                  <tr>
                    <th scope="row">회원 사진</th>
                    <td>
                      <img
                        src={pvo.uvo ? pvo.uvo.imgurl : "/path/to/default-image.jpg"}
                        alt="회원 사진"
                        style={{ width: "100px", height: "100px"}}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">아이디</th>
                    <td>
                      <span
                        className="fText eMarketChecker"
                        style={{ width: "400px", display: "inline-block" }}
                      >
                        {pvo.uvo ? pvo.uvo.id : ""}
                      </span>
                    </td>
                  </tr>
                 
                  <tr>
                    <th scope="row">이름</th>
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="fText eMarketChecker"
                        style={{ width: "150px" }}
                        value={name}
                        onChange={(e) => {
                          setNAME(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                  <th scope="row">매너온도</th>
                  <td>
                    <span
                      className="fText eMarketChecker"
                      style={{ width: "400px", display: "inline-block" }}
                    >
                      {pvo.uvo ? pvo.uvo.mannertemp : "0.0"} 도
                    </span>
                  </td>
                 
                  </tr>
                  <tr>
                    <th scope="row">이메일</th>
                    <td>
                      <input
                        type="text"
                        name="email"
                        className="fText eMarketChecker"
                        style={{ width: "150px" }}
                        value={pvo.uvo ? pvo.uvo.email : ''}
                        onChange={(e) => {
                          setEMAIL(e.target.value);
                        }}
                        onBlur={() => {
                          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          if (!emailPattern.test(email)) {
                            alert("올바른 이메일 주소를 입력하세요.");
                            setEMAIL("");
                          }
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">전화번호</th>
                    <td>
                      <input
                        type="tel"
                        name="phone"
                        className="fText eMarketChecker"
                        style={{ width: "150px" }}
                        value={pvo.uvo ? pvo.uvo.phone:''}
                        onChange={(e) => {
                          setPHONE(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          const charCode = e.which ? e.which : e.keyCode;
                          if (charCode < 48 || charCode > 57) {
                            e.preventDefault();
                            alert("숫자만 입력할 수 있습니다.");
                          }
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                  <th scope="row">가입일</th>
                  <td>
                    <span
                      className="fText eMarketChecker"
                      style={{ width: "400px", display: "inline-block" }}
                    >
                      {pvo.uvo ? pvo.uvo.create_dtm : ""}
                    </span>
                  </td>
                 
                  </tr>
                  <tr>
                    <th scope="row">삭제일</th>
                    <td>
                      <span
                        className="fText eMarketChecker"
                        style={{ width: "400px", display: "inline-block" }}
                      >
                        {pvo.uvo ? pvo.uvo.del_dtm : ""}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>

      <div className="mButton gCenter" style={{ marginBottom: "20px" }}>
        <a onClick={() => {editUser1(userkey); }} className="btnSubmit" id="eProductRegister">
          <span>회원수정</span>
        </a>
        <a
          onClick={() => {deleteUser(userkey); }}
          className="btnEm btnPreview"
          id="eProductRegister"
        >
          <span>회원탈퇴</span>
        </a>
      </div>

      {/* 게시글 정보 테이블 */}
      <div className="section" id="QA_register2">
        
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="게시글 정보">
              <caption>게시글 정보</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">게시글 키</th>
                  <th scope="col">제목</th>
                </tr>
              </thead>
              <tbody>
                <tr key={postkey}>
                  <td
                    className="fText eMarketChecker eHasModifyProductAuth"
                    style={{ textAlign: "center" }}
                  >
                    {pvo.postkey || ""}
                  </td>
                  <td
                    className="fText eMarketChecker eHasModifyProductAuth"
                    style={{ textAlign: "center" }}
                  >
                    {pvo.title || ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      

      {/* 매너 평가 테이블 */}
      <div className="section" id="QA_register2">
        
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="매너 평가 목록">
              <caption>매너 평가 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">평가자 키</th>
                  <th scope="col">매너</th>
                  <th scope="col">간편후기</th>
                </tr>
              </thead>
              <tbody>
                {m_list.length > 0 ? (
                  m_list.map((manner, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {manner.estimateuserkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {manner.ismanner ? "좋음" : "나쁨"}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {manner.rvo.review || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      매너 평가가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 관심 사용자 목록 테이블 */}
      <div className="section" id="QA_register2">
        
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="관심 사용자 목록">
              <caption>관심 사용자 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">사용자</th>
                  <th scope="col">생성 날짜</th>
                </tr>
              </thead>
              <tbody>
                {l_list.length > 0 ? (
                  l_list.map((likeUser, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {likeUser.likeuserkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {likeUser.create_dtm || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      좋아요 사용자가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 사용자 뱃지 목록 테이블 */}
      <div className="section" id="QA_register2">
        
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="사용자 뱃지 목록">
              <caption>사용자 뱃지 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">뱃지 번호</th>
                  <th scope="col">뱃지명</th>
                  <th scope="col">생성 날짜</th>
                </tr>
              </thead>
              <tbody>
                {ub_list.length > 0 ? (
                  ub_list.map((badge, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {badge.badgekey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {badge.bvo.name || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {badge.create_dtm || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      사용자 뱃지가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 차단 사용자 목록 테이블 */}
      <div className="section" id="QA_register2">
       
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="차단 사용자 목록">
              <caption>차단 사용자 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">차단 사용자 번호</th>
                  <th scope="col">차단 날짜</th>
                </tr>
              </thead>
              <tbody>
                {b_list.length > 0 ? (
                  b_list.map((blockedUser, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {blockedUser.blockeduserkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {blockedUser.create_dtm || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      차단된 사용자가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 미노출 사용자 목록 테이블 */}
      <div className="section" id="QA_register2">
       
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="게시글 미노출 사용자 목록">
              <caption>게시글 미노출 사용자 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">미노출 사용자 번호</th>
                  <th scope="col">생성 날짜</th>
                </tr>
              </thead>
              <tbody>
                {n_list.length > 0 ? (
                  n_list.map((noseeUser, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {noseeUser.noseeuserkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {noseeUser.create_dtm || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      미노출 사용자가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 주소 정보 테이블 */}
      <div className="section" id="QA_register2">
       
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="주소 정보">
              <caption>주소 정보</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">주소 번호</th>
                  <th scope="col">대표도시</th>
                  <th scope="col">알림 여부</th>
                </tr>
              </thead>
              <tbody>
                {a_list.length > 0 ? (
                  a_list.map((address, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {address.addresskey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {address.tvo.region2 || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {address.isalarm ===0 ? "예" : "아니오"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      주소 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 알람 설정 정보 테이블 */}
      <div className="section" id="QA_register2">
      
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="알람 설정 정보">
              <caption>알람 설정 정보</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">알람 종류</th>
                  <th scope="col">알람 여부</th>
                </tr>
              </thead>
              <tbody>
                {s_list.length > 0 ? (
                  s_list.map((setAlarm, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {setAlarm.setalarmkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {setAlarm.isalarm ? "예" : "아니오"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      알람 설정 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 관심 목록 테이블 */}
      <div className="section" id="QA_register2">
        
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="관심 목록">
              <caption>관심 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">관심목록 번호</th>
                  <th scope="col">생성 날짜</th>
                </tr>
              </thead>
              <tbody>
                {w_list.length > 0 ? (
                  w_list.map((wishlist, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {wishlist.wishlistkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {wishlist.create_dtm || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      관심 목록이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 키워드 정보 테이블 */}
      <div className="section" id="QA_register2">
       
        <div className="toggleArea" style={{ display: "block" }}>
          <div className="mBoard typeProduct">
            <table summary="키워드 목록">
              <caption>키워드 목록</caption>
              <colgroup>
                <col className="product" />
                <col style={{ width: "auto" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">키워드</th>
                  <th scope="col">키워드 내용</th>
                </tr>
              </thead>
              <tbody>
                {k_list.length > 0 ? (
                  k_list.map((keyword, index) => (
                    <tr key={index}>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {keyword.keywordkey || ""}
                      </td>
                      <td
                        className="fText eMarketChecker eHasModifyProductAuth"
                        style={{ textAlign: "center" }}
                      >
                        {keyword.content || ""}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      키워드가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
    </div>
  </div>
      </Box>
    </Modal>
  );
}
