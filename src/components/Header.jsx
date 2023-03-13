import styled from "styled-components";
import { useContext, useRef, useState } from "react";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import CustomLink from "./CustomLink";
import { SignOutUser } from "../api/firebase";
import { UserContext } from "../contexts/UserContextProvider";

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  height: 10rem;
  background-color: #424b54;
  color: #f8f9fa;
  padding: 0 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media screen and (max-width: 780px) {
    padding: 0 1rem;
  }

  @media screen and (max-width: 550px) {
    height: 7rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media screen and (max-width: 780px) {
    transition: all 0.9s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: 23rem;
    min-height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #424b54;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

const CurrencyAndLogin = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 3rem;
    align-items: flex-start;
  }
`;
const CurrencyContainer = styled.div``;
const SelectCurrency = styled.select`
  display: block;
  font-size: 1.6rem;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 2em 0.5em 0.8em;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  &:hover {
    border-color: #888;
  }

  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  &::-ms-expand {
    display: none;
  }
`;
const CurrencyOption = styled.option``;
const LoginContainer = styled.div`
  font-size: 1.6rem;
  text-align: left;
`;

const Hamburger = styled.div`
  width: 3rem;
  height: 3rem;
  position: fixed;
  top: 3.7rem;
  right: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 5;

  @media screen and (min-width: 780px) {
    display: none;
  }

  @media screen and (max-width: 550px) {
    top: 2rem;
    transform: scale(0.8);
  }
`;

const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: white;
  transition: all 0.8s;
`;

const Header = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { currentUser } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef();
  const btnRef = useRef();
  const line1 = btnRef?.current?.children[0];
  const line2 = btnRef?.current?.children[1];
  const line3 = btnRef?.current?.children[2];

  if (toggle) {
    menuRef.current.style.right = "0";

    if (line1 && line2 && line3) {
      line1.style = `transform: rotateZ(-405deg) translate(-8px , 6px )`;
      line2.style.opacity = `0`;
      line3.style = `transform: rotateZ(405deg) translate(-8px , -6px )`;
    }
  } else {
    if (line1 && line2 && line3) {
      line1.style = `transform : none`;
      line2.style.opacity = `1`;
      line3.style = `transform : none`;
    }
    if (menuRef.current) {
      menuRef.current.style.right = "-23rem";
    }
  }

  return (
    <HeaderContainer>
      <Logo title="CoinSpy" />
      <LinksContainer ref={menuRef}>
        <NavigationLinks />
        <CurrencyAndLogin>
          <LoginContainer>
            {currentUser ? (
              <span
                onClick={SignOutUser}
                style={{
                  cursor: "pointer",
                }}
              >
                Sign Out
              </span>
            ) : (
              <CustomLink
                data={{
                  path: "/auth",
                  title: "Sign Up",
                }}
              />
            )}
          </LoginContainer>
          <CurrencyContainer>
            <SelectCurrency
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <CurrencyOption value={"USD"}>USD</CurrencyOption>
              <CurrencyOption value={"INR"}>INR</CurrencyOption>
              <CurrencyOption value={"EUR"}>EUR</CurrencyOption>
            </SelectCurrency>
          </CurrencyContainer>
        </CurrencyAndLogin>
      </LinksContainer>

      <Hamburger onClick={() => setToggle(!toggle)} ref={btnRef}>
        <Line></Line>
        <Line></Line>
        <Line></Line>
      </Hamburger>
      {/* <button
        style={{ position: "fixed", top: "30px", right: "20px" }}
        
      >
        toggle
      </button> */}
    </HeaderContainer>
  );
};

export default Header;
