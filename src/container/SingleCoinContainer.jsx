import { useEffect, useState, useContext } from "react";
import { CurrencyContext } from "../contexts/CurrencyContextProvider";
import { pretifyNumber } from "../components/Card";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../api/coinGeckoApi";
import Chart from "../components/Chart";
import { HistoricalChart } from "../api/coinGeckoApi";
import { chartDays } from "../data";
import SelectedButton from "../components/SelectedButton";
import Button from "../components/Button";
import { UserContext } from "../contexts/UserContextProvider";
import { WatchListContext } from "../contexts/WatchListContextProvider";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../api/firebase";

const Container = styled.div`
  width: 90%;
  margin: auto;

  @media screen and (max-width: 550px) {
    width: 99%;
  }
`;

const Header = styled.header`
  background-color: #cac7ff27;
  font-size: 3rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  letter-spacing: 2px;
  border-radius: 1rem;

  @media screen and (max-width: 550px) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const ContainerInfo = styled.div`
  width: 100%;
  max-width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 65% 1fr;
  border-radius: 1rem;
  gap: 1rem;
  background-color: #cac7ff27;
  padding: 4rem 2rem;

  @media screen and (max-width: 1370px) {
    grid-template-columns: 100%;
  }

  @media screen and (max-width: 550px) {
    padding: 4rem 0.5rem;
  }
`;

const CoinInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const box = styled.div`
  border-radius: 1rem;
  background-color: blue;
  height: 32rem;
  width: 100%;
  color: #f0f0ff;
  background-color: rgba(255, 255, 255, 0.172);
  backdrop-filter: blur(1rem);
  padding: 1.6rem;

  @media screen and (max-width: 550px) {
    padding: 1.6rem 1rem;
  }
`;
const ChartContainer = styled(box)`
  height: 65rem;
  font-size: 2rem;

  @media screen and (max-width: 1370px) {
    height: 50rem;
  }
`;

const ChartWrapper = styled.div`
  height: 85%;

  @media screen and (max-width: 550px) {
    height: 88%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.6rem;
`;

const CoinSummary = styled(box)`
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 550px) {
    gap: 1rem;
  }
`;
const CoinInfo = styled(box)``;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 17rem;
  height: 17rem;

  @media screen and (max-width: 550px) {
    width: 9rem;
    height: 9rem;
  }
`;
const Image = styled.img`
  border-radius: 1rem;
  width: 100%;
  height: 100%;
`;
const Name = styled.h1`
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: 2.4rem;
  }
`;

const Right = styled.div``;

const MarketData = styled.h3`
  font-size: 1.8rem;

  @media screen and (max-width: 550px) {
    font-size: 1.6rem;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  span {
    font-weight: 400;
  }
`;

const CoinInfoHead = styled.h2`
  margin-bottom: 1rem;
`;
const Description = styled.div`
  font-size: 1.6rem;
  line-height: 1.5;
  opacity: 0.8;
`;

const SingleCoinContainer = () => {
  const { id } = useParams();
  const [coinDetail, setCoinDetail] = useState([]);

  const { watchList } = useContext(WatchListContext);
  const { currency, code, symbol } = useContext(CurrencyContext);
  const { currentUser } = useContext(UserContext);

  const [historicalData, setHistoricalData] = useState([]);
  // eslint-disable-next-line
  const [days, setDays] = useState(1);

  useEffect(() => {
    getSingleCoin();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    getHistorialData();
    // eslint-disable-next-line
  }, [id, days]);

  const inWatchList = watchList.includes(coinDetail?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(firestoreDb, "watchlist", currentUser.uid);

    try {
      await setDoc(coinRef, {
        coins: watchList ? [...watchList, coinDetail?.id] : [coinDetail?.id],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatchList = async () => {
    const coinRef = doc(firestoreDb, "watchlist", currentUser.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((item) => item !== coinDetail?.id),
        },
        { merge: "true" }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getHistorialData = async () => {
    const { data } = await axios(HistoricalChart(id, days, currency));

    setHistoricalData(data.prices);
  };

  const getSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoinDetail(data);
  };
  return (
    <Container>
      <Header>{coinDetail?.id} Details</Header>

      <ContainerInfo>
        <ChartContainer>
          <ChartWrapper>
            <Chart days={days} historicalData={historicalData} />
          </ChartWrapper>
          <ButtonContainer>
            {chartDays.map(({ label, value }, index) => {
              return (
                <SelectedButton
                  options={{
                    title: label,
                    color: "white",
                    backgroundColor: "black",
                    clickHandler: () => setDays(value),
                    isSelected: value === days,
                  }}
                  key={index}
                />
              );
            })}
          </ButtonContainer>
        </ChartContainer>
        <CoinInfoContainer>
          <CoinSummary>
            <Left>
              <ImageContainer>
                <Image src={coinDetail?.image?.large} alt={coinDetail?.name} />
              </ImageContainer>
              <Name>{coinDetail?.name}</Name>
              {currentUser && (
                <Button
                  title={
                    inWatchList ? "Remove from Watchlist" : "Add to Watchlist"
                  }
                  onClick={inWatchList ? removeFromWatchList : addToWatchlist}
                />
              )}
            </Left>
            <Right>
              <MarketData>
                Rank: <span>{coinDetail?.market_cap_rank}</span>
              </MarketData>
              <MarketData>
                Current Price:{" "}
                <span>
                  {symbol}
                  {pretifyNumber(
                    currency === "INR"
                      ? coinDetail?.market_data?.current_price?.inr
                      : coinDetail?.market_data?.current_price?.usd,
                    code
                  )}
                </span>
              </MarketData>
              <MarketData>
                Marker Cap:{" "}
                <span>
                  {symbol}
                  {pretifyNumber(
                    currency === "INR"
                      ? coinDetail?.market_data?.market_cap?.inr
                      : coinDetail?.market_data?.market_cap?.usd,
                    code
                  )}
                </span>
              </MarketData>
              <MarketData>
                Price Change 24h:{" "}
                <span>
                  {symbol}
                  {pretifyNumber(
                    currency === "INR"
                      ? coinDetail?.market_data?.price_change_24h_in_currency
                          .inr
                      : coinDetail?.market_data?.price_change_24h_in_currency
                          .usd,
                    code
                  )}
                </span>
              </MarketData>
              <MarketData>
                Total Supply:{" "}
                <span>
                  {symbol}
                  {pretifyNumber(coinDetail?.market_data?.total_supply, code)}
                </span>
              </MarketData>
              <MarketData>
                Max Supply:{" "}
                <span>
                  {symbol}
                  {pretifyNumber(coinDetail?.market_data?.max_supply, code)}
                </span>
              </MarketData>
              <MarketData>
                Total Volume:{" "}
                <span>
                  {symbol}
                  {pretifyNumber(
                    currency === "INR"
                      ? coinDetail?.market_data?.total_volume?.inr
                      : coinDetail?.market_data?.total_volume?.usd,
                    code
                  )}
                </span>
              </MarketData>
            </Right>
          </CoinSummary>
          <CoinInfo>
            <CoinInfoHead>Description</CoinInfoHead>
            <Description
              dangerouslySetInnerHTML={{
                __html: `${coinDetail?.description?.en.split(".")[0]}.${
                  coinDetail?.description?.en.split(".")[1]
                }.${coinDetail?.description?.en.split(".")[2]}.`,
              }}
            ></Description>
          </CoinInfo>
        </CoinInfoContainer>
      </ContainerInfo>
    </Container>
  );
};

export default SingleCoinContainer;
