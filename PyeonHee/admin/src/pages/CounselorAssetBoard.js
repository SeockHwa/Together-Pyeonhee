import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function CounselorAssetBoard({match}) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  const deleteNotificationBoard=()=>{
    axios({
        method:"POST",
        url: `/admin/counselorAssetDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/counselorListAsset/1';
        }else{
            alert('삭제 실패');
        }
    }).catch(error=>{
        console.log(error);
    });
  }

  useEffect(() => {
    axios({
      method:"POST",
      url: `/admin/counselorAssetInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data);

        setName(res.data.name);
        setCompany(res.data.company);
        setEmail(res.data.email);

    }).catch(error=>{
        console.log(error);
    });
  },[])

  return (
    <div className="NotificationBoardDiv">
        <p className="NotificationTitleText">상담사 확인</p>
        <div className="NotificationWriteDiv">
        <div className="CounselorWriteBodyDiv">
            <div className="BoardWriteTitleDiv">
            <p className="NotificationBoardTitleFont">상담사 이름:&nbsp;</p>
            <p className="CounselorBoardTitle">{name}</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상담사 이메일:&nbsp;</p>
            <p className="CounselorBankNameTitle">{email}</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상담사 소속회사:&nbsp;</p>
            <p className="CounselorBankNameTitle">{company}</p>
            </div>
            <div className="BoardCateInputDiv">
                <p className="NotificationBoardCateFont">상담 분류:&nbsp;</p>
                <p className="CounselorCateInBoard">자산관리</p>
            </div>
            <div className="CounselorContentDiv">
            <div className="FinancialRow">
            </div>
            </div>
            <div className="NotificationBoardButtonDiv">
            <button className="NotificationUpdateButton" type='button' onClick={deleteNotificationBoard}>삭제</button>
            </div>
        </div>
        </div>
    </div>
    );

}

export default CounselorAssetBoard;