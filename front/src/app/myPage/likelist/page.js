'use client'

import MyPageSide from "@/component/user/layout/MyPageSide";
import React, { useEffect, useState } from "react";
import "/public/css/myPage.css";
import "/public/css/likelist.css";
import "/public/css/paging.css";
import Link from "next/link";
import axios from "axios";
import LikePost from "@/component/user/myPage/likelist/LikePost";
import LikeCategory from "@/component/user/myPage/likelist/LikeCategory";
import LikeKeyword from "@/component/user/myPage/likelist/LikeKeyword";
import Cookies from "js-cookie";
// import { useSearchParams } from "next/navigation";

export default function Page() {

  // const params = useSearchParams();
  // const userkey = params.get('userkey');

  const [likeWhat, setLikeWhat] = useState('post');
  const [likeList, setLikeList] = useState([]);
  const [whatNow, setWhatNow] = useState('post');
  const [totalCount, setTotalCount] = useState(0);
  const [display, setDisplay] = useState('게시글');
  const [page, setPage] = useState({});

  const API_URL = '/user/api/likeLists';
  const DEL_URL = '/adpost/delLike';

  const userkey = Cookies.get("userkey");

  function changePage(pNum) { 
    getLikeList(likeWhat,pNum);
  }

  function getLikeList(likeWhat,cPage){
      axios({
        url: API_URL,
        method: "post",
        params: {
          "likewhat": likeWhat,
          "userkey": userkey,
          "cPage": cPage,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setLikeList(res.data.likeList);
        setWhatNow(likeWhat);
        setPage(res.data.page);
        setTotalCount(res.data.totalCount);
      });
  }

  function getDelLike(likeWhat,likeKey){
    alert(`likeWhat: ${likeWhat} || likeKey: ${likeKey}`);
      axios({
        url: DEL_URL,
        method: "post",
        params: {
          "likeWhat": likeWhat,
          "likeKey": likeKey,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if(res.data.result_delete > 0){
          alert("삭제 성공!");
          getLikeList(likeWhat,page.nowPage);
        } else{
          alert("오류가 발생했습니다");
        }
      });
  }

  useEffect(()=>{
    getLikeList(likeWhat);
    switch(likeWhat){
      case "post":
        setDisplay("게시글");
        break;
      case "category":
        setDisplay("카테고리");
        break;
      case "keyword":
        setDisplay("키워드");
        break;
    }
    
  },[likeWhat]);

  
   return(
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }} className="">
            <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
              <nav className="iq86zf0">
                <ol className="iq86zf1 _588sy42q _588sy415q">
                  <li>
                    <a href="/">
                      <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                        <font style={{ verticalAlign: "inherit" }}>홈</font>
                      </span>
                    </a>
                    <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                      <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                    </span>
                  </li>
                </ol>
              </nav>
              <a href="/myPage">
                <div className="_588sy41z _588sy421 _588sy42q _588sy415q">
                  <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                    <font style={{ verticalAlign: "inherit" }}>
                      마이 페이지
                    </font>
                  </span>
                </div>
              </a>
            </div>
          </section>
        </div>
        <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
            {/* <jsp:include page="/WEB-INF/views/user/myPageSub/myPageSide.jsp"/> */}
            <MyPageSide />
            {/* <!-- 여기서부터 콘텐츠 --> */}
            <div
              data-v-81750584=""
              data-v-0adb81cc=""
              className="content_area my-page-content"
            >
              <div
                data-v-6b53f901=""
                data-v-81750584=""
                className="content_title border"
              >
                <div data-v-6b53f901="" className="title">
                  <h3 data-v-6b53f901="">관심목록</h3>
                </div>
              </div>
              <div
                data-v-09af5873=""
                data-v-81750584=""
                className="saved-chips-container"
              >
                <button data-v-09af5873="" onClick={()=>setLikeWhat('post')} className={likeWhat == 'post' ? "saved-chip active" : "saved-chip"}>
                  게시글
                </button>
                <button data-v-09af5873="" onClick={()=>setLikeWhat('category')} className={likeWhat == 'category' ? "saved-chip active" : "saved-chip"}>
                  카테고리
                </button>
                <button data-v-09af5873="" onClick={()=>setLikeWhat('keyword')} className={likeWhat == 'keyword' ? "saved-chip active" : "saved-chip"}>
                  키워드
                </button>
              </div>
              <div data-v-81750584="" className="saved-product">
                <div data-v-3d362ce8="">
                  { likeList.length == 0 ?
                  /* <!-- 없을 경우 --> */
                  <div data-v-3d362ce8="" className="content">
                    <div
                      data-v-24868902=""
                      data-v-eff62a72=""
                      className="empty_area"
                    >
                      <p data-v-24868902="" className="desc">
                        관심 {display}{display=="게시글"?'이':'가'} 없습니다.
                      </p>
                      <a
                        data-v-420a5cda=""
                        data-v-24868902=""
                        href="/post"
                        className="btn outlinegrey small"
                      >
                        {" "}
                        SHOP 바로가기{" "}
                      </a>
                    </div>
                  </div>
                  : /* 있을 경우 */
                  <div data-v-3d362ce8="" className="my_interest">
                    <div data-v-3d362ce8="" className="content-header">
                      <div data-v-3d362ce8="" className="total-rows">
                        전체 {totalCount}
                      </div>
                      <div
                        data-v-69f3b122=""
                        data-v-3d362ce8=""
                        className="filter_sorting"
                      >
                        <button
                          data-v-69f3b122=""
                          type="button"
                          className="sorting_title"
                        >
                          {" "}
                          관심 등록순{" "}
                        </button>
                      </div>
                    </div>
                    <ul
                      data-v-6aa963fd=""
                      data-v-3d362ce8=""
                      className="wish_list"
                    >
                      {/* ForEach로 돌리기 */}
                      { whatNow == 'post' ? <LikePost likelist={likeList} getDelLike={getDelLike}/> : whatNow == 'category' ? <LikeCategory likelist={likeList} getDelLike={getDelLike}/>: <LikeKeyword likelist={likeList} getDelLike={getDelLike}/>}
                    </ul>
                    {/* 페이징 시작*/}
                    <div className="mPaginate">
                      {page.startPage > 1 && (
                        <Link href="#" onClick={() => changePage(page.startPage - page.pagePerBlock)} className="prev">
                          이전 {page.pagePerBlock}페이지
                        </Link>
                      )}
                      <ol>
                        {Array.from({ length: page.endPage - page.startPage + 1 }, (_, i) => page.startPage + i).map((pNum) => (
                          <li key={pNum}>
                            {page.nowPage == pNum ? (
                              <strong title="현재페이지">{pNum}</strong>
                            ) : (
                              <Link href="#" onClick={() => changePage(pNum)}>{pNum}</Link>
                            )}
                          </li>
                        ))}
                      </ol>
                      {page.endPage < page.totalPage && (
                        <Link href="#" onClick={() => changePage(page.endPage + 1)} className="next">
                          다음 {page.pagePerBlock}페이지
                        </Link>
                      )}
                    </div>
                    {/* 페이징 끝*/}
                  </div>
                }
                </div>
              </div>
            </div>
            {/* 여기까지 컨텐츠 */}
          </section>
        </div>
      </article>
    </>
  );
}
