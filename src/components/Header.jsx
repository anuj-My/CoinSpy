import styled from "styled-components";
import { useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
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

const CurrencyAndLogin = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const CurrencyContainer = styled.div``;
const SelectCurrency = styled.select``;
const CurrencyOption = styled.option``;
const LoginContainer = styled.div`
  font-size: 2rem;
`;

const Header = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);
  return (
    <HeaderContainer>
      <Logo title="CoinSpy" />

      <NavigationLinks />
      <CurrencyAndLogin>
        <CurrencyContainer>
          <SelectCurrency
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <CurrencyOption value={"USD"}>USD</CurrencyOption>
            <CurrencyOption value={"INR"}>INR</CurrencyOption>
          </SelectCurrency>
        </CurrencyContainer>
        <LoginContainer>login</LoginContainer>
      </CurrencyAndLogin>
    </HeaderContainer>
  );
};

export default Header;
