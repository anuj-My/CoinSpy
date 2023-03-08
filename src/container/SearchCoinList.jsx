import styled from "styled-components";
import Search from "../components/Search";
import CoinTable from "../components/CoinTable";

const Container = styled.section`
  width: 85%;
  margin: 2rem auto;

  @media screen and (max-width: 780px) {
    width: 95%;
  }

  @media screen and (max-width: 550px) {
    width: 99%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  @media screen and (max-width: 550px) {
    font-size: 2.4rem;
  }
`;

const SearchCoinList = () => {
  return (
    <Container>
      <Title>Cryptocurrency prices by market cap </Title>
      <Search />
      <CoinTable />
    </Container>
  );
};

export default SearchCoinList;
