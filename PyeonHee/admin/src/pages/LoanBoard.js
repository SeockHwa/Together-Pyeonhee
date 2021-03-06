import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

function LoanBoard({match}) {
  const [productName, setProductName] = useState('');
  const [productCate, setProductCate] = useState('펀드');
  const [productBankName, setProductBankName] = useState('');

  //대출
  const [interestType, setInterestType] = useState('');
  const [repayType, setRepayType] = useState('');

  const [interest, setInterest] = useState('');  //연금 공통, 대출 공통

  const [link, setLink] = useState('');

  const deleteBoard =()=>{
    axios({
        method:"POST",
        url: `/admin/loanDelete`,
        data:{
            boardID: match.params.boardID,
        }
    })
    .then((res)=>{
        if(res.data.status === 'success'){
            alert('삭제 성공');
            document.location.href = '/financialLoanList/1';
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
      url: `/admin/loanBoardInfo`,
      data:{
          boardID: match.params.boardID,
      }
    })
    .then((res)=>{
        console.log(res.data.result[0]);

        setProductName(res.data.result[0].product_name);
        setProductBankName(res.data.result[0].bank_name);
        setProductCate(res.data.result[0].productCate);
        setInterestType(res.data.result[0].interest_type);
        setInterest(res.data.result[0].interest);
        setRepayType(res.data.result[0].repay_type);
        setLink(res.data.result[0].link);

    }).catch(error=>{
        console.log(error);
    });
  },[])

    return (
    <div className="NotificationBoardDiv">
        <p className="NotificationTitleText">상품 확인</p>
        <div className="NotificationWriteDiv">
        <div className="FinancialWriteBodyDiv">
        <div className="BoardWriteTitleDiv">
            <p className="NotificationBoardTitleFont">상품명:&nbsp;</p>
            <p className="FinancialBoardTitle">{productName}</p>
            </div>
            <div className="BoardWriteTitleDiv">
                <p className="FinancialBankFont">상품 회사명:&nbsp;</p>
                <p className="FinancialBankNameTitle">{productBankName}</p>
            </div>
            <div className="LinkDiv">
            <p className="LinkFont">상품링크:&nbsp;</p>
            <p className="LinkTextInBoard">{link}</p>
            </div>
            <div className="BoardCateInputDiv">
                <p className="NotificationBoardCateFont">상품 분류:&nbsp;</p>
                <p className="FinancialCateInBoard">대출</p>
            </div>
            <div className="FinancialFundDiv">
            <div className="FinancialFundWriteDiv">
                    <div className="FinancialRow">
                      <p>금리 방식:&nbsp;</p>
                      <p>{interestType}</p>
                    </div>
                    <div className="FinancialRow">
                      <p>상환 방식:&nbsp;</p>
                      <p>{repayType}</p>
                    </div>
                    <div className="FinancialRow">
                        <p>금리:&nbsp;</p>
                        <p>{interest}</p>
                        <p>%</p>
                      </div>
                </div>
            </div>
            <div className="NotificationBoardButtonDiv">
            <button className="NotificationDeleteButton" type='button' onClick={deleteBoard}>삭제</button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default LoanBoard;