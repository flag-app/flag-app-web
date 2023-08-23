import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState } from '../recoil/Atoms';
import axios from 'axios';

import logo from '../contents/Logo_플래그_Small_수정.svg';
import nextButton from '../contents/desktop/sign/Btn_다음.svg'; // 다음

const Logo = styled.img`
  width: 253.662109375px;
  height: 93px;
  margin: 164px auto 0px;
  display: block;

  @media screen and (max-width: 500px) {
    width: 200px;
    margin-top: 128px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 1024px;
  margin: 0 auto;

  @media screen and (max-width: 500px) {
  }
`;

const TitleWrapper = styled.div`
  width: 450px;
  margin: 84px auto 0;
  text-align: left;

  @media screen and (max-width: 500px) {
    width: 300px;
    margin-top: 92px;
  }
`;

const ResetPasswordTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  font-style: Inter;

  @media screen and (max-width: 500px) {
    font-size: 22px;
  }
`;

const InputWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
  }
`;

const EmailInput = styled.input`
  width: 450px;
  height: 50px;
  margin: 10px auto 0px;
  padding-left: 20px;
  background-color: #d9d9d9;
  border-radius: 13px;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  border: 0;
  outline: none;
  display: inline;

  @media screen and (max-width: 500px) {
    width: 300px;
    font-size: 15px;
    margin: 15px auto 0px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextButton = styled.img`
  width: 355px;
  height: 41px;
  margin: 34px auto 0;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const FindEmailWrapper = styled.div`
  margin: 60px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 360px) {
    margin-top: 20px;
  }
`;

const EmailReminder = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-style: Noto Sans KR;
  line-height: normal;
  color: #494949;
  margin-right: 14px;
  float: left;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const FindEmail = styled.a`
  float: left;
  color: #8e6fff;
  font-size: 18px;
  font-weight: 500;
  font-style: Noto Sans KR;
  line-height: normal;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

function ResetPassword1() {
  const [email, setEmail] = useRecoilState(emailState);
  const [emailSend, setEmailSend] = useState(true);
  const navigate = useNavigate();

  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };

  const handleNextButtonClick = () => { //이메일 인증
    if (!email) {
      window.alert('이메일을 입력해주세요.');
    }
    // const requestData = {
    //   email: email,
    // };
    axios({
      method: 'POST',
      url: '/user/reset-password',
      data: {
        email: email,
        //email: requestData.email,
      },
    })
      .then((response) => {
        console.log(response.data.isSuccess);
        if (response.data.isSuccess === true) {
          navigate('/password-change-email');
          setEmailSend(true);
          console.log('인증번호 이메일 발송 성공');
          <Link
            to="/password-change-email"
            state={{ email: email }}
          />;
        } else if (response.data.isSuccess === false) {
          alert('인증번호 이메일 발송 실패: ');
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error('AxiosError:', error);
        console.log('인증번호 메일 실패');
      });
    //axios
  };

  const handleFindEmailClick = () => {
    console.log();
  };

  return (
    <>
      <Wrapper>
        <Logo src={logo} alt="로고" />
        <TitleWrapper>
          <ResetPasswordTitle>
            비밀번호 찾기
          </ResetPasswordTitle>
        </TitleWrapper>
        <InputWrapper>
          <EmailInput
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailInputChange}
          />
        </InputWrapper>
        <ButtonWrapper>
          {/* <Link
            to="/password-change-email"
            state={{ email: email }}
          > */}
          <NextButton
            src={nextButton}
            onClick={handleNextButtonClick}
          />
          {/* </Link> */}
        </ButtonWrapper>
        <FindEmailWrapper>
          <EmailReminder>
            이메일이 기억이 나지 않나요?
          </EmailReminder>
          <Link to="/find-email">
            <FindEmail onClick={handleFindEmailClick}>
              이메일 찾기
            </FindEmail>
          </Link>
        </FindEmailWrapper>
      </Wrapper>
    </>
  );
}

export default ResetPassword1;
