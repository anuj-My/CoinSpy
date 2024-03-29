import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../contexts/SearchContextProvider";
import TableItem from "./TableItem";
import Pagination from "./Pagination";
import { CoinContext } from "../contexts/CoinContextProvider";
import { Link } from "react-router-dom";

const CoinTableContainer = styled.section`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #cac7ff27;
  padding: 4rem 2rem;
  border-radius: 1rem;

  @media screen and (max-width: 550px) {
    padding: 4rem 0.4rem;
  }
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
  @media screen and (max-width: 550px) {
    padding: 1.6rem 1rem;
  }
`;
const CoinHead = styled.h4`
  @media screen and (max-width: 550px) {
    font-size: 1.4rem;
  }
`;
const PriceHead = styled.h4`
  @media screen and (max-width: 550px) {
    font-size: 1.4rem;
  }
`;
const TimeHead = styled.h4`
  @media screen and (max-width: 550px) {
    font-size: 1.4rem;
  }
`;
const MarketCapHead = styled.h4`
  @media screen and (max-width: 550px) {
    font-size: 1.4rem;
  }
`;

const CoinTable = () => {
  const { coinList, getCoinList } = useContext(CoinContext);
  const { searchInput } = useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const lastPage = coinList.length / itemsPerPage;

  useEffect(() => {
    getCoinList();
    // eslint-disable-next-line
  }, []);

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
      return (
        <Link to={`coins/${coin?.id}`} key={coin.id}>
          <TableItem item={coin} />;
        </Link>
      );
    });

  return coinList.length > 0 ? (
    <CoinTableContainer>
      <TableHead>
        <CoinHead>Coin</CoinHead>
        <PriceHead>Price</PriceHead>
        <TimeHead>24hrs Change</TimeHead>
        <MarketCapHead>Market Cap</MarketCapHead>
      </TableHead>
      {coinItemMap}
      {coinItemMap.length === 10 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          lastPage={lastPage}
        />
      )}
    </CoinTableContainer>
  ) : (
    <div style={{ margin: "5rem 0", fontSize: "3rem" }}>Fetching...</div>
  );
};

export default CoinTable;
