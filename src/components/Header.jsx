import styled from "styled-components";
import { useContext } from "react";
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
  box-shadow: 0px 0.5rem 1rem #1d1d1d;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
`;

const CurrencyAndLogin = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
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
  a:not(:last-child) {
    margin-right: 2rem;
  }
`;

const Header = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  const { currentUser } = useContext(UserContext);

  return (
    <HeaderContainer>
      <LinksContainer>
        <Logo title="CoinSpy" />
        <NavigationLinks />
      </LinksContainer>
      <CurrencyAndLogin>
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
        <LoginContainer>
          {currentUser ? (
            <span onClick={SignOutUser}>Sign Out</span>
          ) : (
            <CustomLink
              data={{
                path: "/auth",
                title: "Sign Up",
              }}
            />
          )}
        </LoginContainer>
      </CurrencyAndLogin>
    </HeaderContainer>
  );
};

export default Header;
