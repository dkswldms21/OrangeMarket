'use client';

import axios from 'axios';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import { Box, Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

export default function Page(props) {
  const open = props.editModalOpen;
  const onClose = props.handleEditModalClose;
  const boardkey = props.boardkey;

  // formats로 사용자가 넣을 수 있는 데이터를 제한함
  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "align", "float", "blockquote", "list", "bullet", "indent", "background", "color", "link", "image", "video", "height", "width"];
  const API_URL = `/admin/board/getBbs?boardkey=${boardkey}`;
  const ALL_BC_URL = "/admin/board/getAllBc";
  const BC_URL = "/admin/board/getBc";
  const EDIT_URL = "/admin/board/edit";
  const AddImage_URL = "/admin/board/addImage";
  
  if (!Quill.imports['modules/imageActions']) {
    Quill.register('modules/imageActions', ImageActions);
  }

  if (!Quill.imports['modules/imageFormats']) {
    Quill.register('modules/imageFormats', ImageFormats);
  }

  const [vo, setVo] = useState({});
  const [bc_list, setBc_list] = useState([]);
  const [content, setContent] = useState(''); // 에디터에 적히는 값
  const [title, setTitle] = useState('');
  const [categoryname, setCategoryname] = useState('');
  const [userkey, setUserkey] = useState("1");
  const quillRef = useRef();

  function getData() {
    axios.get(API_URL)
      .then((res) => {
        setVo(res.data.bvo);
        setTitle(res.data.bvo.title);
        setContent(res.data.bvo.content);
        getCategoryname(boardkey);
      });
  }

  function getCategoryname(boardkey) {
    axios.get(BC_URL, { params: { boardkey } })
        .then((res) => {
            setCategoryname(res.data.categoryname);
        });
  }

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userkey', userkey);
    formData.append('boardkey', boardkey);
    const response = await axios({
      url: AddImage_URL,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    if (response.data.chk === 1) {
      return response.data.filePath;
    } else {
      throw new Error('업로드 실패');
    }
  };

  const uploadContent = async () => {
    const formData = new FormData();
    formData.append('boardkey', boardkey);
    formData.append('content', content);
    formData.append('title', title);
    formData.append('userkey', userkey);
    formData.append('categoryname', categoryname);
  
    try {
      const response = await axios({
        url: EDIT_URL,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      if (response.data.chk === 1) {
        alert("수정 성공");
        await props.getBbsData(1);
        onClose();
        return response.data.filePath;
      } else {
        throw new Error('업로드 실패');
      }
    } catch (error) {
      console.error("업로드 중 에러 발생:", error);
    }
  };
  
  useEffect(() => {
    if (boardkey) {
      getData();
    }
    const multiFunction = async () => {
      const res = await axios.get(ALL_BC_URL);
      setBc_list(res.data.bc_list || []);
    };
    multiFunction();
  }, [boardkey]);

  const replaceImage = async (file, oldImageUrl) => {
    if (oldImageUrl) {
      await axios.post('/admin/board/deleteImage', { imageUrl: oldImageUrl });
    }
    return await uploadImage(file);
  };

  const modules = useMemo(() => ({
    imageActions: {},
    imageFormats: {},
    toolbar: {
      container: [
        ["link", "image", "video"],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
      handlers: {
        image: async () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.addEventListener('change', async () => {
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection(true);
            const file = input.files[0];
            if (file) {
              try {
                const leaf = editor.getLeaf(range.index - 1);
                const oldImageUrl = leaf && leaf[0]?.domNode?.tagName === 'IMG' ? leaf[0].domNode.src : null;
                const newImageUrl = await replaceImage(file, oldImageUrl);
                if (oldImageUrl) {
                  editor.deleteText(range.index, 1);
                }
                editor.insertEmbed(range.index, 'image', newImageUrl);
                editor.setSelection(range.index + 1);
              } catch (error) {
                console.error("이미지 교체 오류", error);
              }
            }
          });
          input.click();
        },
      },
    },
  }), []);

  return (
    <React.Fragment>
      <Dialog open={open} onClose={onClose} BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} disableRestoreFocus
        PaperProps={{ sx: { padding: '20px', width: '700px', height: '650px', maxWidth: '90%', borderRadius: '16px', boxShadow: 'none', }}}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%", }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px", gap: "10px", }} >
            <select className="fSelect" id="sel_board_no" name="sel_board_no" value={categoryname || ""} 
              onChange={(e) => setCategoryname(e.target.value)} 
              style={{ flex: "0.3", height: "40px", padding: "10px", boxSizing: "border-box", fontSize: "16px !important", }} >
              <option value="" disabled hidden>
                :::카테고리 선택:::
              </option>
              {bc_list &&
                bc_list.map((bc, i) => (
                  <option key={i} value={bc.value}>
                    {bc.value}
                  </option>
                ))}
            </select>
            <TextField id="title1" name="title1" placeholder="제목" required value={title || vo.title || ""} 
              variant="outlined" size="small" InputProps={{ readOnly: true }} 
              sx={{ flex: "0.7", height: "40px", boxSizing: "border-box" }} />
          </Box>
        </Box>
        <DialogContent sx={{ flex: 1, padding: 0, width: '100%',  boxSizing: 'border-box', overflow: 'hidden', }} >
          <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", boxSizing: "border-box", }} >
            <ReactQuill theme="snow" ref={quillRef} modules={modules} formats={formats} value={content || vo.content || ""} onChange={setContent}
              style={{ width: "100%",  height: "420px",  margin: 0, }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button variant="contained" color="success" onClick={uploadContent} sx={{ fontSize: '12px', color: 'white', marginRight: "10px", }}>
            저장
          </Button>
          <Button variant="contained" onClick={onClose} sx={{ backgroundColor: "#BDBDBD", color: "white", "&:hover": { backgroundColor: "gray" }, }}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
