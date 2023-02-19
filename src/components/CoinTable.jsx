import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { CoinList } from "../api/coinGeckoApi";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";

import { SearchContext } from "../contexts/SearchContextProvider";
import TableItem from "./TableItem";

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
  background-color: #6e46ff;
  margin-bottom: 2.3rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  /* text-align: left; */
`;
const CoinHead = styled.h4``;
const PriceHead = styled.h4``;
const TimeHead = styled.h4``;
const MarketCapHead = styled.h4``;

const CoinTable = () => {
  const [coinList, setCoinList] = useState([]);
  const { currency } = useContext(CurrencyContext);
  const { searchInput } = useContext(SearchContext);
  // console.log(coinList);

  useEffect(() => {
    getCoinList();
  }, []);

  const getCoinList = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoinList(data);
  };

  const filteredCoins = coinList.filter((coin) => {
    if (
      coin?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      coin?.symbol.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return coin;
    }
  });

  const coinItemMap = filteredCoins.map((coin) => {
    return <TableItem item={coin} key={coin.id} />;
  });

  return (
    <CoinTableContainer>
      <TableHead>
        <CoinHead>Coin</CoinHead>
        <PriceHead>Price</PriceHead>
        <TimeHead>24hrs Change</TimeHead>
        <MarketCapHead>Market Cap</MarketCapHead>
      </TableHead>
      {coinItemMap}
    </CoinTableContainer>
  );
};

export default CoinTable;
