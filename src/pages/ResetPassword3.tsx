import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { confirmPasswordValidState } from '../recoil/Atoms';
import axios from 'axios';

import logo from '../contents/Logo_플래그_Small_수정.svg';
import errorIcon from '../contents/desktop/sign/Ic_Error.svg';
import resetButton from '../contents/desktop/sign/Btn_비밀번호재설정_passwordrenew.svg'; // 비밀번호 재설정 버튼

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
  text-align: left;
  margin: 84px auto 0;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const ResetPasswordTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  font-family: Inter;
  line-height: normal;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    margin: 10px auto;
  }
`;

const NewPasswordInput = styled.input`
  width: 450px;
  height: 50px;
  background-color: #d9d9d9;
  margin-top: 10px;
  border-radius: 13px;
  padding-left: 20px;
  outline: none;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  border: 0;

  @media screen and (max-width: 500px) {
    width: 300px;
    font-size: 15px;
  }
`;

const MessageWrapper = styled.div`
  width: 450px;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;

const ErrorIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 6px;

  @media screen and (max-width: 500px) {
    width: 20px;
    height: 20px;
  }
`;

const Message = styled.div`
  color: #999;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  font-family: Noto Sans KR;
  margin: 7px auto 0 0;
  display: flex;
  align-items: center;

  @media screen and (max-width: 500px) {
    margin: 5px auto 0 0;
    font-size: 12px;
  }
`;

const NewPasswordCheckInput = styled(NewPasswordInput)`
  margin-top: 30px;

  @media screen and (max-width: 500px) {
    margin-top: 5px;
  }
`;

const ResetButton = styled.img`
  width: 355px;
  margin: 34px auto 0px;
  display: block;

  @media screen and (max-width: 500px) {
    margin-top: 35px;
    width: 300px;
  }
`;

function ResetPassword3() {
  const [newPassword, setNewPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] =
    useRecoilState(confirmPasswordValidState);
  const token = sessionStorage.getItem('token');

  const handleNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);

    const newPasswordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,25}$/;
    setPasswordValid(
      newPasswordRegExp.test(newPasswordValue),
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const confirmPasswordValue = e.target.value;

    setConfirmPasswordValid(
      confirmPasswordValue === newPassword,
    );
  };

  const handleResetPasswordButtonClick = () => {
    if (passwordValid && confirmPasswordValid) {
      const requestData = {
        newPassword: newPassword,
      };
      axios({
        url: '/user/{userId}/password2',
        method: 'PATCH',
        headers: {
          Authorization: token,
        },
        data: {
          newPassword: requestData.newPassword,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('AxiosError:', error);
          console.log('비밀번호 재설정 실패');
        });
      return <Link to="/password-change-complete" />;
    } else {
      window.alert('비밀번호 재설정을 완료해주세요.');
    }
  };

  return (
    <>
      <Wrapper>
        <Logo src={logo} alt="로고" />
        <TitleWrapper>
          <ResetPasswordTitle>
            비밀번호 재설정
          </ResetPasswordTitle>
        </TitleWrapper>
        <InputWrapper>
          <NewPasswordInput
            type="password"
            placeholder="새 비밀번호 입력"
            onChange={handleNewPasswordChange}
          />
          <MessageWrapper>
            {!passwordValid && (
              <Message>
                <ErrorIcon
                  src={errorIcon}
                  alt="에러 아이콘"
                />
                올바른 형식이 아닙니다.
              </Message>
            )}
            {passwordValid && (
              <Message>올바른 형식입니다.</Message>
            )}
          </MessageWrapper>
        </InputWrapper>
        <InputWrapper>
          <NewPasswordCheckInput
            type="password"
            placeholder="새 비밀번호 확인"
            onChange={handleConfirmPasswordChange}
          />
          <MessageWrapper>
            {!confirmPasswordValid && (
              <Message>
                <ErrorIcon
                  src={errorIcon}
                  alt="에러 아이콘"
                />
                동일한 비밀번호가 아닙니다.
              </Message>
            )}
            {confirmPasswordValid && (
              <Message>비밀번호가 동일합니다.</Message>
            )}
          </MessageWrapper>
        </InputWrapper>
        <Link
          to={
            passwordValid && confirmPasswordValid
              ? '/reset-password-complete'
              : '#'
          }
        >
          <ResetButton
            src={resetButton}
            alt="비밀번호 재설정 버튼"
            onClick={handleResetPasswordButtonClick}
          />
        </Link>
      </Wrapper>
    </>
  );
}

export default ResetPassword3;
