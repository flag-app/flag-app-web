import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoginAtom } from '../recoil/Atoms';
import { Link } from 'react-router-dom';
import logo from '../contents/Logo_플래그_Small_수정.svg';
import menuBtn from '../contents/desktop/sign/Ic_Menu.svg';
import mobileLogo from '../contents/mobile/sign/Logo_플래그.svg';
import mobileMenuBtn from '../contents/mobile/sign/Btn_로그인_Menu.svg';
//display: none;
//border: 2px solid #000;
//@media screen and (max-width: 360px) {}
//<Link to="/"> </Link>

const HeaderCover = styled.div`
  height: 114px;
  display: flex;
  white-space: nowrap;
  @media screen and (max-width: 500px) {
    width: 100%;
    height: 63px;
    margin: 41px 0px 0px;
  }
`;
const HeaderLogo = styled.button`
  display: inline;
  border: none;
  width: 166px;
  height: 57px;
  flex-shrink: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-image: url(${logo});
  margin: 31px 257px 20px 201px;
  @media screen and (max-width: 500px) {
    width: 95px;
    height: 32px;
    background-image: url(${mobileLogo});
    margin: 15px 23px 14px;
  }
`;
const HeaderItem = styled.span`
  font-color: #272727;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  margin: auto 69px 26px 0px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const HeaderLogin = styled.div`
  font-color: #272727;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  margin: auto 175px 25px auto;
  text-align: right;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const HeaderLoginMenuBtn = styled.button`
  border: none;
  width: 32px;
  height: 33px;
  flex-shrink: 0;
  background-image: url(${menuBtn});
  background-color: transparent;
  background-repeat: no-repeat;
  margin-left: 88px;
  @media screen and (max-width: 500px) {
    display: none; 
  }
`;
const HeaderMenuLine = styled.ul`
  width: 120px;
  text-align: right;
  margin: 55px 200px auto auto;
  background-color: #FFF;
  position: relative;
  z-index: 2;
`;
const MenuItem = styled.li`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 27px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const HeaderMobileMenuBtn = styled.button`
  display: none;
  text-align: right;
  @media screen and (max-width: 500px) {
    display: inline; 
    border: none;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    background-image: url(${mobileMenuBtn});
    background-color: transparent;
    background-repeat: no-repeat;
    margin: auto 20px 15px auto; 
  }
`;
const HeaderLine = styled.hr`
  border: 0.5px solid rgba(142, 111, 255, 0.8);
  width: 100%;
  position: relative;
  z-index: 3;
  @media screen and (max-width: 500px) {
    width: 100%;
    flex-shrink: 0;
    border: 1px solid #D5CBFF;
    margin: 0px;  
  }
`;
const MenuCover = styled.div`
  padding: 62px 30px 0px 0px;
  @media screen and (max-width: 500px) {
  }
`;
const SideMenuCover = styled.div`
  width: 250px;
  height: 800px;
  top: 0;
  right: -292px;
  text-align: right;
  padding: 12px;
  background-color: #FFF;
  box-shadow: -5px 4px 19px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  transition: 0.5s ease;
  &.open {
    background-color: none;
    right: 0;
    transition: 0.5s ease;
  }
`;
const HeaderMobileSideMenuBtn = styled.button`
  border: none;
  width: 29px;
  height: 29px; 
  text-align: right;
  flex-shrink: 0;
  background-image: url(${mobileMenuBtn});
  background-color: transparent;
  background-repeat: no-repeat;
  margin: 55px 23px 30px auto; 
`;
const SideMenuItem = styled.li`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 23px;
  margin-right: 23px;
`;
 
function Header() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [menu, setMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      // sessionStorage 에 name 라는 key 값으로 저장된 값이 없다면
      console.log("isLogin ?? :: ", isLogin);
      setIsLogin(false);
    } else {
      // sessionStorage 에 name 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      console.log("isLogin ?? :: ", isLogin);
      setIsLogin(true);
    }
  }, []);

  //로그아웃 버튼 클릭시
  const navigate = useNavigate();
  const onLogout = () => {
    console.log("로그아웃");
    sessionStorage.removeItem("token");
    setIsLogin(false);
    navigate('/');
  }

  return (
    <>
      <HeaderCover>
        <Link to="/"><HeaderLogo /></Link> 
        <HeaderItem><Link to="/serviceInfo">서비스 안내</Link></HeaderItem>
        <HeaderItem>
          {isLogin === true ? (<Link to="/promise-view">플래그</Link>)
          :(<Link to="/login">플래그</Link>)}</HeaderItem>
        { isLogin ? (
            <HeaderMenuLine>
              <HeaderLoginMenuBtn onClick={() => setMenu(!menu)} />
              {menu && (
                <MenuCover>
                  <MenuItem><Link to="/MyPage">마이페이지</Link></MenuItem>
                  <MenuItem>이용약관</MenuItem>
                  <MenuItem onClick={onLogout}>로그아웃</MenuItem>
                </MenuCover>
              )}
            </HeaderMenuLine>
          )
          : (<HeaderLogin><Link to="/login">로그인</Link></HeaderLogin>)
        }
        { mobileMenu ? ( 
            <SideMenuCover className={ mobileMenu ? 'open' : ''}>
              <HeaderMobileSideMenuBtn onClick={() => setMobileMenu(!mobileMenu)} />
              <ul>
                <SideMenuItem><Link to="/serviceInfo" onClick={() => setMobileMenu(!mobileMenu)}>서비스 안내</Link></SideMenuItem>
                <SideMenuItem><Link to="/promise-view" onClick={() => setMobileMenu(!mobileMenu)}>플래그</Link></SideMenuItem>
                
                { isLogin ? 
                  (<><SideMenuItem><Link to="/MyPage" onClick={() => setMobileMenu(!mobileMenu)}>마이페이지</Link></SideMenuItem>
                  <SideMenuItem onClick={() => {
                    onLogout();
                    setMobileMenu(!mobileMenu);
                  }}>로그아웃</SideMenuItem></>)
                  : (<SideMenuItem><Link to="/login">로그인/회원가입</Link></SideMenuItem>)
                }
                  
                <SideMenuItem>이용약관</SideMenuItem>
              </ul>
            </SideMenuCover>
          )
          : (<HeaderMobileMenuBtn onClick={() => setMobileMenu(!mobileMenu)} />)
        }      
      </HeaderCover>
      <HeaderLine />
      <Outlet />
    </>
  );
}
export default Header;
