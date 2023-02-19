import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { ExchangesList } from "../api/coinGeckoApi";
import Card from "./Card";

const ExchangesCardContainer = styled.section`
  width: 100%;
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #cac7ff27;
  padding: 4rem 2rem;
  border-radius: 1rem;
`;

const ExchangesCards = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const ExchangesCardList = () => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    getExchangesList();
  }, []);

  const getExchangesList = async () => {
    const { data } = await axios.get(ExchangesList());
    setExchanges(data);
  };

  const exchangesListMap = exchanges.map((exchange) => {
    return <Card item={exchange} key={exchange.id} />;
  });
  return (
    <ExchangesCardContainer>
      <ExchangesCards>{exchangesListMap}</ExchangesCards>
    </ExchangesCardContainer>
  );
};

export default ExchangesCardList;
