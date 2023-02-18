import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { CoinList } from "../api/coinGeckoApi";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";

import CoinItem from "./CoinItem";

const CoinTableContainer = styled.section`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #cac7ff27;
  padding: 4rem 2rem;
  border-radius: 1rem;
`;
const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  color: #f0f0ff;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  padding: 1.6rem 2rem;
`;
const CoinHead = styled.h4``;
const PriceHead = styled.h4``;
const TimeHead = styled.h4``;
const MarketCapHead = styled.h4``;

const Coins = styled.div``;

const CoinTable = () => {
  const [coinList, setCoinList] = useState([]);
  const { currency } = useContext(CurrencyContext);
  console.log(coinList);

  useEffect(() => {
    getCoinList();
  }, []);

  const getCoinList = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoinList(data);
  };

  const coinItemMap = coinList.map((coin) => {
    return <CoinItem coin={coin} key={coin.id} />;
  });

  return (
    <CoinTableContainer>
      <TableHead>
        <CoinHead>Coin</CoinHead>
        <PriceHead>Price</PriceHead>
        <TimeHead>One Day</TimeHead>
        <MarketCapHead>Market Cap</MarketCapHead>
      </TableHead>
      <Coins>{coinItemMap}</Coins>
    </CoinTableContainer>
  );
};

export default CoinTable;
