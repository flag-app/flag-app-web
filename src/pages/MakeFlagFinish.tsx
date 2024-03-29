import styled from 'styled-components';
import btn_modify from '../contents/desktop/flag/데스크탑_Btn_약속만들기완료_Modify.svg';
import btn_modify_mobile from '../contents/mobile/flag/모바일_btn_약속만들기완료_Modify.svg';
import btn_recall from '../contents/desktop/flag/데스크탑_Btn_약속만들기완료_Recall.svg';
import btn_recall_mobile from '../contents/mobile/flag/모바일_Btn_약속만들기완료_Recall.svg';
import background_info from '../contents/desktop/flag/Rec_약속만들기완료_Undefined.svg';
import background_info_mobile from '../contents/mobile/flag/모바일_Frame_약속만들기완료_Summary.svg';
import {
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { makeFlagAtom } from '../recoil/Atoms';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 382px;
  height: 184px;
  background-image: url('${background_info}');
  background-size: cover;
  margin-bottom: 20px;
  @media screen and (max-width: 500px) {
    background-image: url('${background_info_mobile}');
    width: 307px;
    height: 161px;
  }
`;

const DateArea = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
  @media screen and (max-width: 500px) {
    margin-top: 18px;
  }
`;

const Date = styled.span`
  font-size: 12px;
`;

const Time = styled.div`
  font-size: 14px;
  margin-top: 26px;
  @media screen and (max-width: 500px) {
    margin-top: 24px;
  }
`;

const Place = styled.div`
  font-size: 14px;
  margin-top: 26px;
  @media screen and (max-width: 500px) {
    margin-top: 24px;
  }
`;

const FriendsArea = styled.div`
  margin-top: 42px;
  width: 250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  @media screen and (max-width: 500px) {
    margin-top: 24px;
    width: 200px;
  }
`;

const Friend = styled.span`
  font-size: 12px;
`;

const Message = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
`;

const Btn_modify = styled.button`
  width: 355px;
  height: 41px;
  border: none;
  background-color: transparent;
  background-image: url('${btn_modify}');
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    width: 285px;
    height: 39px;
    background-image: url('${btn_modify_mobile}');
  }
`;

const Btn_recall = styled.button`
  width: 355px;
  height: 41px;
  border: none;
  background-color: transparent;
  background-image: url('${btn_recall}');
  @media screen and (max-width: 500px) {
    width: 285px;
    height: 39px;
    background-image: url('${btn_recall_mobile}');
  }
`;

const MakeFlagFinish = () => {
  const {
    flagName,
    selectedDates,
    selectedCell,
    flagPlace,
    flagMemo,
    minimumTime,
    checkedFriends,
    cycle,
  } = useRecoilValue(makeFlagAtom);

  const value = useRecoilValue(makeFlagAtom);

  const navigate = useNavigate();
  const resetValue = useResetRecoilState(makeFlagAtom);
  const token = sessionStorage.getItem('token');
  const handleModify = () => {
    navigate('/makeFlag', { replace: true });
  };

  const guestNames: string[] = [];
  checkedFriends.map((friend) => {
    guestNames.push(friend.name);
  });

  const handleRecall = () => {
    console.log(guestNames);
    console.log(value);
    console.log(token);
    axios({
      url: '/flag/add',
      method: 'post',
      headers: {
        Authorization: token,
      },
      data: {
        name: flagName,
        timeSlot: cycle,
        minTime: minimumTime,
        place: flagPlace.content,
        memo: flagMemo.content,
        guestNames: guestNames,
        dates: selectedDates,
        possibleDates: selectedCell,
      },
    })
      .then((response) => {
        console.log(response);
        resetValue();
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Wrapper>
      <Title>{flagName}</Title>
      <Info>
        <DateArea>
          {selectedDates.map((date) => (
            <Date>{date}</Date>
          ))}
        </DateArea>
        <Time>미정</Time>
        <Place>
          {flagPlace.content ? flagPlace.content : '미정'}
        </Place>
        <FriendsArea>
          {checkedFriends.map((friend) => (
            <Friend>
              {friend.name ? friend.name : '미정'}
            </Friend>
          ))}
        </FriendsArea>
      </Info>
      <Message>약속을 만들었습니다!</Message>
      <Btn_modify onClick={handleModify} />
      <Btn_recall onClick={handleRecall} />
    </Wrapper>
  );
};

export default MakeFlagFinish;
