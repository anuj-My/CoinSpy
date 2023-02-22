import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { CoinList } from "../api/coinGeckoApi";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";

import { SearchContext } from "../contexts/SearchContextProvider";
import TableItem from "./TableItem";
import Pagination from "./Pagination";

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

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lastPage = coinList.length / itemsPerPage;

  useEffect(() => {
    getCoinList();
    // eslint-disable-next-line
  }, []);

  const getCoinList = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoinList(data);
  };

  // eslint-disable-next-line
  const filteredCoins = coinList.filter((coin) => {
    if (
      coin?.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      coin?.symbol.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      return coin;
    }
  });

  const coinItemMap = filteredCoins
    .slice(
      currentPage * itemsPerPage - itemsPerPage,
      currentPage * itemsPerPage
    )
    .map((coin) => {
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
      {CoinList.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          lastPage={lastPage}
        />
      )}
    </CoinTableContainer>
  );
};

export default CoinTable;
