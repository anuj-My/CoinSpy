import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";
import { TrendingCoins } from "../api/coinGeckoApi";
import CarouselItem from "./CarouselItem";

const BannerContainer = styled.section`
  background: url("https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80")
    no-repeat center center/cover;
  background-attachment: fixed;
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;

  &::before {
    content: "";
    background-image: linear-gradient(
      360deg,
      rgb(66, 75, 84),
      rgba(66, 75, 84, 0.568),
      rgba(66, 75, 84, 0.286)
    );
    top: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    min-height: 100vh;
    width: 100%;
    z-index: -1;
  }
`;
const ShortNote = styled.div`
  color: #f9f8fa;
  width: 60%;
`;

const Title = styled.div`
  color: #f9f8fa;
  text-decoration: none;
  letter-spacing: 0.6rem;
  font-size: 6rem;
  span {
    color: #6e46ff;
    font-weight: bold;
  }
`;

const Tagline = styled.div`
  margin: 2rem 0 1rem 0;
  font-size: 2.4rem;
`;
const Desc = styled.div`
  opacity: 0.8;
  font-size: 1.6rem;
`;

const CarouselContainer = styled.div`
  width: 60%;
`;

const Banner = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    getTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);

  const getTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrendingCoins(data);
  };

  const items = trendingCoins.map((coin) => {
    return <CarouselItem key={coin.id} coin={coin} />;
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <BannerContainer>
      <ShortNote>
        <Title>
          Coin<span>Spy</span>
        </Title>
        <Tagline>
          Stay Ahead of the Game with Coinspy - Your Source for Crypto Insights.
        </Tagline>
        <Desc>
          Coinspy is your one-stop shop for all things crypto. From tracking the
          latest coin prices to exploring the newest blockchain projects, we've
          got you covered.
        </Desc>
      </ShortNote>

      <CarouselContainer>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableButtonsControls
          disableDotsControls
          autoPlay
          responsive={responsive}
          items={items}
        />
      </CarouselContainer>
    </BannerContainer>
  );
};

export default Banner;
