import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import searchIc from '../contents/desktop/mypage/Ic_마이페이지 - 친구추가_Search.svg';
import { addFriendAtom, friendListAtom } from '../recoil/Atoms';
import MyPageFriendAddItem from '../components/mypageFriends/MyPageFriendAddItem';
import btnBack from '../contents/mobile/mypage/Btn_back.svg';
import mobileLogo from '../contents/mobile/sign/Logo_플래그.svg';
import mobileMenuBtn from '../contents/mobile/sign/Btn_로그인_Menu.svg';
import axios from 'axios';

//display: none;
//border: 2px solid #000;
const FriendsAddHeaderFrame = styled.div`
  display: none;
  @media screen and (max-width: 500px) {
    border-bottom: 1px solid #D5CBFF;
    display: flex;
    width: 100%;
    height: 63px;
    margin-top: 41px;
  }
`;
const FriendsAddHeaderBack = styled.button`
  display: none;
  @media screen and (max-width: 500px) {
    border: none;
    display: inline; 
    width: 28px;
    height: 28px;
    background-image: url(${btnBack});
    background-color: transparent;
    background-repeat: no-repeat;
    margin: auto 0px 11px 12px;
  }
`;
const FriendsAddHeaderLogo = styled.img`
  display: none;
  @media screen and (max-width: 500px) {
    display: inline; 
    margin: auto auto 10px 30%;
  }
`;

const FriendsAddText = styled.div`
  color: #000;
  font-family: Apple SD Gothic Neo;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 54px auto 0px 86px;
  @media screen and (max-width: 500px) {
    font-size: 20px;
    margin: 30px auto 0px 29px;
  }
`;
const FriendsSearchFrame = styled.div`
  width: 423px;
  height: 42px;
  gap: 6px;
  flex-shrink: 0;
  border-radius: 14px;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  margin: 28px auto 0px 86px;
  padding-left: 13px;
  @media screen and (max-width: 500px) {
    width: 310px;
    height: 35px;
    padding-left: 10px;
    margin: 15px auto 0px 28px;
  }
`;
const FriendsSearch = styled.input`
  border: none;
  
  outline: none;
  color: #999;
  background: #D9D9D9;
  font-family: Noto Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media screen and (max-width: 500px) {
    width: 210px;
  }
`;
const FriendsSearchIc = styled.img`
  margin-left: 160px;
  margin-right: 13px;
  @media screen and (max-width: 500px) {
    margin-left: 50px;
  }
`;


function FriendsAdd() {
  const [inputWord, setInputWord] = useState('');
  const [name, setName] = useState('');
  const [addFriend, setAddFriend] = useRecoilState(addFriendAtom);
  const [friendList, setFriendList] = useRecoilState(friendListAtom);

  useEffect(()=> {
    const userName = sessionStorage.getItem('name');
    if (userName !== null){
      setName(userName);
    }
    sessionStorage.removeItem('name');

    console.log('친구목록 업데이트');
    const token = sessionStorage.getItem('token');
    axios({
      url: '/friends/friendList',
      method: 'get',
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      setFriendList(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const friendSearch = () => {
    console.log("친구 조회");
    console.log("친구이름: " + inputWord);
    const token = sessionStorage.getItem('token');
    axios({
      url: '/friends/List',
      method: 'POST',
      headers: {
        Authorization: token,
      },
      params: {
        name: inputWord,
      },
    }).then(response => {
      console.log(response.data);
      console.log(friendList);
      if (response.data.isSuccess === true) {
        console.log(response.data.result);
        let isFriend = false;
        for (let f of friendList) {
          if (f.name === inputWord) {
            isFriend = true;
          }
        }
        if (name === inputWord) {
          isFriend = true;
        }
        setAddFriend({name: inputWord, isFriend: isFriend});
      } else {
        alert(response.data.message);
      }
    }).catch(error => {
      console.error('AxiosError:', error);
    });
    console.log("백엔드 전달");
  }

  return (
    <>
      <FriendsAddHeaderFrame>
        <FriendsAddHeaderBack onClick={() => {window.close();}} />
        <FriendsAddHeaderLogo src={mobileLogo} />
      </FriendsAddHeaderFrame>
      <FriendsAddText>친구 추가</FriendsAddText>
      <FriendsSearchFrame>
        <FriendsSearch type='text' id='searchFriend' placeholder="검색" onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setInputWord(e.target.value); } } />
        <FriendsSearchIc src={searchIc} onClick={friendSearch}/>
      </FriendsSearchFrame>
      <MyPageFriendAddItem name={addFriend.name} existFriend={addFriend.isFriend} />
    </>
  );
}
export default FriendsAdd;