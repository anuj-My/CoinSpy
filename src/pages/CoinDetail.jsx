import styled from "styled-components";
import SingleCoinContainer from "../container/SingleCoinContainer";

const Container = styled.section`
  margin: 13rem 0;
`;

const CoinDetail = () => {
  return (
    <Container>
      <SingleCoinContainer />
    </Container>
  );
};

export default CoinDetail;
