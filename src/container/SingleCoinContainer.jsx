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
import Button from "../components/Button";

const Container = styled.div`
  width: 90%;
  margin: auto;
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
`;

const CoinInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const box = styled.div`
  border-radius: 1rem;
  background-color: blue;
  height: 30rem;
  width: 100%;
  color: #f0f0ff;
  background-color: rgba(255, 255, 255, 0.172);
  backdrop-filter: blur(1rem);
  padding: 1.6rem;
`;
const ChartContainer = styled(box)`
  height: 61rem;
  font-size: 2rem;
`;

const ChartWrapper = styled.div`
  height: 85%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.6rem;
`;

const CoinSummary = styled(box)`
  display: flex;
  gap: 2rem;
`;
const CoinInfo = styled(box)``;

const Left = styled.div``;
const ImageContainer = styled.div`
  width: 17rem;
  height: 17rem;
  margin-bottom: 1rem;
`;
const Image = styled.img`
  border-radius: 1rem;
  width: 100%;
  height: 100%;
`;
const Name = styled.h1`
  text-align: center;
`;

const Right = styled.div``;

const MarketData = styled.h3`
  font-size: 1.8rem;
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

  const { currency, code, symbol } = useContext(CurrencyContext);

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
      <h1>Coin Details</h1>

      <ContainerInfo>
        <ChartContainer>
          <ChartWrapper>
            <Chart days={days} historicalData={historicalData} />
          </ChartWrapper>
          <ButtonContainer>
            {chartDays.map(({ label, value }, index) => {
              return (
                <Button
                  options={{
                    title: label,
                    color: "white",
                    backgroundColor: "black",
                    clickHandler: () => setDays(value),
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
