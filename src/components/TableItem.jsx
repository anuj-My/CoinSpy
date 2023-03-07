import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";
import { pretifyNumber } from "./Card";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";

const CoinListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 1.6rem;
  color: #f0f0ff;
  background-color: rgba(255, 255, 255, 0.182);
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  cursor: pointer;
  /* text-align: left; */

  &:hover {
    transform: scale(1.1);
    margin-bottom: 3px;
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const Coin = styled.span`
  display: flex;
  gap: 1.5rem;
`;

const CoinImage = styled.img`
  width: 5rem;
  height: 5rem;
`;

const NameAndSymbol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.span``;
const Symbol = styled.span`
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const Price = styled.span``;
const Time = styled.span`
  color: ${({ isProfit }) => (isProfit ? "green" : "red")};
  font-weight: bolder;
  /* font-size: 2rem; */
`;
const MarketCap = styled.span``;

const TableItem = ({ item }) => {
  const isProfit = item?.price_change_percentage_24h >= 0;
  const { code, symbol } = useContext(CurrencyContext);
  return (
    <CoinListItem>
      <Coin>
        <CoinImage src={item?.image} alt={item?.name} />
        <NameAndSymbol>
          <Symbol>{item?.symbol}</Symbol>
          <Name>{item?.name}</Name>
        </NameAndSymbol>
      </Coin>
      <Price>
        {symbol}
        {pretifyNumber(item?.current_price, code)}
      </Price>
      <Time isProfit={isProfit}>
        {isProfit ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />}
        {isProfit && "+"}
        {item?.price_change_percentage_24h.toFixed(2)}%
      </Time>
      <MarketCap>
        {symbol}
        {pretifyNumber(item?.market_cap, code)}
      </MarketCap>
    </CoinListItem>
  );
};

export default TableItem;
