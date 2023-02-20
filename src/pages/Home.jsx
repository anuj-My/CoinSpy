import styled from "styled-components";
import Banner from "../components/Banner";
import SearchCoinList from "../container/SearchCoinList";

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Banner />
      <SearchCoinList />
    </Container>
  );
};

export default Home;
