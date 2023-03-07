import styled from "styled-components";
import ExchangesCardList from "../components/ExchangesCardList";

const Container = styled.section`
  width: 85%;
  margin: 13rem auto;

  @media screen and (max-width: 780px) {
    width: 95%;
  }
`;

const ExChangesHeading = styled.h1`
  margin-bottom: 2rem;

  @media screen and (max-width: 550px) {
    font-size: 2.6rem;
  }
`;

const ExchangesContainer = () => {
  return (
    <Container>
      <ExChangesHeading>
        Top Crypto Exchanges Ranked by Trust Score
      </ExChangesHeading>
      <ExchangesCardList />
    </Container>
  );
};

export default ExchangesContainer;
