import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { emailState } from '../recoil/Atoms';

import logo from '../contents/Logo_플래그_Small_수정.svg';
import nextButton from '../contents/desktop/sign/Btn_다음.svg'; // 다음
import errorIcon from '../contents/desktop/sign/Ic_Error.svg';

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

const ResetPasswordTitle = styled.h2`
  margin: 88px auto 0 535px;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  font-style: Inter;

  @media screen and (max-width: 500px) {
    font-size: 22px;
    margin: 97px auto 0 75px;
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
    width: 350px;
    font-size: 15px;
    margin: 20px auto 0px;
  }
`;

const Message = styled.div<{
  isValid: boolean;
}>`
  color: #999999;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  font-family: Noto Sans KR;
  margin: 8px auto 0 0;
  display: flex;
  align-items: center;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const ErrorIcon = styled.img`
  width: 23px;
  height: 23px;
  margin-right: 8px;
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
    width: 350px;
    margin: 28px auto 0;
  }
`;

const FindEmailWrapper = styled.div`
  margin: 60px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 360px) {
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
  const [inputEmail, setInputEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailValid = (inputEmail: string) => {
    const emailRegExp =
      /^[0-9a-zA-Z]+@[0-9a-zA-Z]+(\.[a-zA-Z]{2,3})+$/;
    return emailRegExp.test(inputEmail);
  };

  const handleEmailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newEmail = e.target.value;
    setInputEmail(newEmail);
    setIsValidEmail(emailValid(newEmail));
  };

  const handleNextButtonClick = () => {
    if (isValidEmail) {
      return <Link to="/password-change-email" />;
    } else {
      window.alert('이메일을 제대로 입력해주세요.');
    }
  };

  const handleFindEmailClick = () => {
    console.log();
  };

  return (
    <>
      <Wrapper>
        <Logo src={logo} alt="로고" />
        <ResetPasswordTitle>
          비밀번호 찾기
        </ResetPasswordTitle>
        <InputWrapper>
          <EmailInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailInputChange}
          />
          <Message isValid={isValidEmail}>
            {isValidEmail ? (
              '사용 가능한 이메일입니다.'
            ) : (
              <>
                <ErrorIcon
                  src={errorIcon}
                  alt="에러 아이콘"
                />
                올바른 형식이 아닙니다.
              </>
            )}
          </Message>
        </InputWrapper>
        <ButtonWrapper>
          <Link
            to="/password-change-email"
            state={{ email }}
          >
            <NextButton
              src={nextButton}
              onClick={handleNextButtonClick}
            />
          </Link>
        </ButtonWrapper>
        <FindEmailWrapper>
          <EmailReminder>
            이메일이 기억이 나지 않나요?
          </EmailReminder>
          <Link to={isValidEmail ? '/find-email' : '#'}>
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
