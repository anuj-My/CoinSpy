import styled from "styled-components";
import ExchangesCardList from "../components/ExchangesCardList";

const Container = styled.section`
  width: 85%;
  margin: 13rem auto;
`;

const ExChangesHeading = styled.h1`
  margin-bottom: 2rem;
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
