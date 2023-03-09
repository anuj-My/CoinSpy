import { useContext } from "react";
import styled from "styled-components";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";

const Container = styled.div`
  display: flex;
  border-radius: 1rem;
  padding: 1rem;
  gap: 2rem;
  width: 30rem;

  color: #f0f0ff;
  background-color: rgba(255, 255, 255, 0.182);
  backdrop-filter: blur(4px);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Title = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
`;
const Right = styled.div`
  div:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Rank = styled.div`
  font-size: 1.6rem;
  span {
    font-weight: bold;
  }
`;

const TrustScore = styled.div`
  font-size: 1.6rem;

  span {
    font-weight: bold;
  }
`;

const Volume = styled.div`
  font-size: 1.6rem;

  span {
    font-weight: bold;
  }
`;

const NormalizedVolume = styled.div`
  font-size: 1.6rem;

  span {
    font-weight: bold;
  }
`;

export const pretifyNumber = (num, code) => {
  const formattedNumber = Intl.NumberFormat(code, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
  return formattedNumber;
};

const Card = ({ item }) => {
  const { code, symbol } = useContext(CurrencyContext);
  return (
    <Container>
      <Left>
        <ImageContainer>
          <Image src={item?.image} />
        </ImageContainer>
        <Title>{item?.name}</Title>
      </Left>
      <Right>
        <Rank>
          <span>Rank:</span>
          &nbsp;
          {item?.trust_score_rank}
        </Rank>
        <TrustScore>
          <span>Trust Score:</span>&nbsp;
          {item?.trust_score}
        </TrustScore>
        <Volume>
          <span>24h Volume:</span> &nbsp;
          {symbol}
          {pretifyNumber(item?.trade_volume_24h_btc, code)}
        </Volume>
        <NormalizedVolume>
          <span>{`24h Volume(Normalized)`}:</span> &nbsp;
          {symbol}
          {pretifyNumber(item?.trade_volume_24h_btc_normalized, code)}
        </NormalizedVolume>
      </Right>
    </Container>
  );
};

export default Card;
