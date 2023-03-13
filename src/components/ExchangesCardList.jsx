import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { ExchangesList } from "../api/coinGeckoApi";
import Card from "./Card";

const ExchangesCardContainer = styled.section`
  width: 100%;
  max-width: 100%;
  margin: auto;
  /* display: flex;
  flex-direction: column; */
  background-color: #cac7ff27;
  padding: 4rem 2rem;
  border-radius: 1rem;
`;

const ExchangesCards = styled.div`
  display: grid;
  grid-gap: 1rem;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
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
