'use client'

import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function DetailModal(props) {
  const open = props.detailModalOpen;
  const onClose = () => { props.handleDetailModalClose(); };
  const boardkey = props.boardkey;

  const API_URL = `/admin/board/getBbs?boardkey=${boardkey}`;
  const DEL_URL = `/admin/board/del?boardkey=${boardkey}`;
  const BC_URL = "/admin/board/getBc";
  const [vo, setVo] = useState({});
  const [categoryname, setCategoryname] = useState('');

  const goEdit = () => {
    onClose(); 
    props.handleEditModalOpen();
  };
  
  function getData() {
    axios.get(API_URL).then((res) => {
      setVo(res.data.bvo);
      getCategoryname(boardkey);
    });
  }

  useEffect(() => {
    if (boardkey) {
      getData();
    }
  }, [boardkey]);
  

  function del() {
    const confirmation = confirm("선택된 게시글을 정말 삭제하시겠습니까?");
    if (!confirmation) {
      return;
    }
    axios.post(DEL_URL).then(res => {
      alert("삭제 완료");
      props.getBbsData(1); 
      onClose();
    });
  }

  function getCategoryname(boardkey) {
    axios.get(BC_URL, { params: { boardkey } }).then((res) => {
      setCategoryname(res.data.categoryname);
    });
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth
          PaperProps={{ sx: { width: '900px', height: '700px', maxWidth: '90%', borderRadius: '16px', boxShadow: 'none', } }}
          BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', position: 'relative' }}>
          상세보기
          <Typography onClick={onClose} sx={{ position: 'absolute', fontSize: '18px', right: 14, top: 14, cursor: 'pointer', fontWeight: 'bold', }} >
            X
          </Typography>
        </DialogTitle>
        <Divider/>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <DialogContent sx={{ width: '90%', height: '550px', overflow: 'auto', padding: 0, marginTop: '10px' }}>
            <TableContainer component={Paper} sx={{ minWidth: 200, borderRadius: 2, boxShadow: 3, width: '100%', height: '100%', overflowX: 'auto' }}>
              <Table sx={{ border: '1px solid lightgray', tableLayout: 'fixed', width: '100%'}} aria-label="공지사항 표">
                <TableBody>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                      게시글 번호
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '0.9rem', borderRight: '1px solid lightgray', borderBottom: '1px solid lightgray', width:'30%' }}>
                      {vo.boardkey}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                      카테고리
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray', width:'30%' }}>
                      {categoryname}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                      작성일
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '0.9rem', borderRight: '1px solid lightgray', borderBottom: '1px solid lightgray', width:'30%' }}>
                      {vo.create_dtm}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                      수정일
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: '0.9rem', borderBottom: '1px solid lightgray', width:'30%' }}>
                      {vo.update_dtm}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.2em', border: '1px solid lightgray', width:'20%' }}>
                      제목
                    </TableCell>
                    <TableCell align="center" colSpan={3} sx={{ fontSize: '1.0rem', borderBottom: '1px solid lightgray' }}>
                      {vo.title}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1.0rem', border: '1px solid lightgray', width:'20%' }}>
                      내용
                    </TableCell>
                    <TableCell align="left" colSpan={3} dangerouslySetInnerHTML={{ __html: vo.content }}
                              sx={{ fontSize: '1.0rem', borderBottom: '1px solid lightgray', height: '400px', padding: '20px', overflow: 'auto', maxHeight: '400px' }} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Box>
        <DialogActions className="dialog-actions" sx={{ justifyContent: 'center', paddingTop: '10px', paddingBottom: '20px' }}>
          <Button variant="contained" color="success" onClick={goEdit} sx={{ fontSize: '12px', color: 'white' }}>
            수정
          </Button>
          <Button variant="contained" color="error" onClick={del} sx={{ fontSize: '12px', color: 'white' }}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
