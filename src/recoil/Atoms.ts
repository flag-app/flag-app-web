import { atom } from 'recoil';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});

export const userIdState = atom<string>({
  key: 'userIdState',
  default: '',
});

export const userNameState = atom<string>({
  key: 'userNameState',
  default: '',
});

export const confirmPasswordValidState = atom({
  key: 'confirmPasswordValidState',
  default: false,
});

export const isLoginAtom = atom({
  key: 'isLogin',
  default: false,
});

export interface IFriendTypes {
  name: string;
}

export interface IOption {
  content: string;
  isChecked: boolean;
}

export interface IFlag {
  flagName: string;
  checkedFriends: IFriendTypes[];
  selectedDates: string[];
  cycle: number;
  minimumTime: number;
  flagPlace: IOption;
  flagMemo: IOption;
  selectedCell: number[];
}

export const friendListAtom = atom<IFriendTypes[]>({
  key: 'friendList',
  default: [],
});

export const makeFlagAtom = atom<IFlag>({
  key: 'makeFlag',
  default: {
    flagName: '', //name
    checkedFriends: [],
    selectedDates: [], // dates
    cycle: -1, // timeSlot
    minimumTime: 1, // minTime

    flagPlace: {
      // place - isChecked 검사해서 보낼때는 content 또는 '' 전달
      content: '',
      isChecked: false,
    },
    flagMemo: {
      // memo - isChecked 검사해서 보낼때는 content 또는 '' 전달
      content: '',
      isChecked: false,
    },
    selectedCell: [], // possibleDates
  },
});

export interface addFriendState {
  name: string;
  isFriend: boolean;
}

export const addFriendAtom = atom<addFriendState>({
  key: 'addFriend',
  default: {
    name: '',
    isFriend: false,
  },
});

export const delFriendAtom = atom<string>({
  key: 'delFriend',
  default: '',
});
