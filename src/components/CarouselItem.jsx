import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";

const CoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const ImageContainer = styled.div`
  width: 9rem;
  height: 9rem;
`;
const CoinImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CoinInfo = styled.div``;
const Symbol = styled.span`
  font-size: 1.8rem;
  color: white;
`;

const PercentageChange = styled.span`
  color: ${({ isProfit }) => (isProfit ? "green" : "red")};
  font-size: 2rem;
  margin-left: 1rem;
`;

const CurrentPrice = styled.div`
  color: white;
  font-size: 2.2rem;
`;

const formattedCurrency = (num, code, currency) => {
  const formatted = num.toLocaleString(code, {
    style: "currency",
    currency: currency,
  });
  return formatted;
};

const CarouselItem = ({ coin }) => {
  const { currency, code } = useContext(CurrencyContext);

  const isProfit = coin?.price_change_percentage_24h >= 0;
  return (
    <Link to={`coin/${coin?.id}`}>
      <CoinContainer>
        <ImageContainer>
          <CoinImage src={coin?.image} alt={coin?.name} />
        </ImageContainer>
        <CoinInfo>
          <Symbol>{coin?.symbol}</Symbol>
          <PercentageChange isProfit={isProfit}>
            {isProfit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
          </PercentageChange>
        </CoinInfo>
        <CurrentPrice>
          {formattedCurrency(coin?.current_price, code, currency)}
        </CurrentPrice>
      </CoinContainer>
    </Link>
  );
};

export default CarouselItem;
