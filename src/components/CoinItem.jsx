import styled from "styled-components";

const CoinListItem = styled.div`
  display: flex;
  justify-content: space-between;
  transition: all 0.3s ease;
  font-size: 1.6rem;
  color: #f0f0ff;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  &:hover {
    transform: scale(1.1);
    margin-bottom: 3px;
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const Coin = styled.span``;
const Price = styled.span``;
const Time = styled.span``;
const MarketCap = styled.span``;

const CoinItem = ({ coin }) => {
  return (
    <CoinListItem>
      <Coin>{coin?.name}</Coin>
      <Price>{coin?.price}</Price>
      <Time>0.5</Time>
      <MarketCap>45623889</MarketCap>
    </CoinListItem>
  );
};

export default CoinItem;
