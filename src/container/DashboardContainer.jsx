/* eslint-disable */
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { firestoreDb } from "../api/firebase";
import Button from "../components/Button";
import TableItem from "../components/TableItem";
import { CoinContext } from "../contexts/CoinContextProvider";
import { UserContext } from "../contexts/UserContextProvider";
import { WatchListContext } from "../contexts/WatchListContextProvider";

const Container = styled.section`
  width: 85%;
  margin: 13rem auto;

  @media screen and (max-width: 780px) {
    width: 98%;
  }
`;

const Profile = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;

  @media screen and (max-width: 1060px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const ImageContainer = styled.div`
  width: 15rem;
  height: 15rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.h1`
  font-size: 4rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  @media screen and (max-width: 780px) {
    font-size: 3rem;
  }
`;

const Watchlist = styled.div`
  background-color: black;
  margin-top: 5rem;
  padding: 2rem;
  border-radius: 1rem;
`;
const Head = styled.h3`
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-bottom: 2.5rem;
  font-size: 2.4rem;
`;

// const TableHead = styled.div`
//   display: flex;
//   justify-content: space-between;
//   color: #f0f0ff;
//   background-color: #6e46ff;
//   margin-bottom: 2.3rem;
//   font-size: 1.6rem;
//   border-radius: 1rem;
//   padding: 1.6rem 2rem;
//   width: 93%;
//   /* text-align: left; */
// `;
// const CoinHead = styled.h4``;
// const PriceHead = styled.h4``;
// const TimeHead = styled.h4``;
// const MarketCapHead = styled.h4``;

const List = styled.div``;

const Row = styled.div`
  display: flex;
  gap: 1rem;

  a {
    flex-basis: 100%;
    margin-bottom: 1.5rem;
  }

  button {
    flex-basis: 0;
  }
`;

const Span = styled.span`
  font-size: 2rem;
  opacity: 0.5;
`;

const DashboardContainer = () => {
  const { currentUser } = useContext(UserContext);
  const { watchList } = useContext(WatchListContext);
  const { coinList } = useContext(CoinContext);

  const removeFromWatchList = async (coin) => {
    const coinRef = doc(firestoreDb, "watchlist", currentUser.uid);

    try {
      await setDoc(
        coinRef,

        {
          coins: watchList.filter((item) => item !== coin?.id),
        },
        { merge: "true" }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Profile>
        <ImageContainer>
          <Image
            src={
              currentUser.photoURL ||
              "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
            }
            alt={currentUser.displayName || currentUser.email}
          />
        </ImageContainer>
        <UserName>
          Welcome,{" "}
          {currentUser?.displayName ||
            currentUser.email.replace("@gmail.com", "")}
        </UserName>
      </Profile>

      <Watchlist>
        <Head>WatchList</Head>
        {watchList.length ? (
          <List>
            {/* <TableHead>
              <CoinHead>Coin</CoinHead>
              <PriceHead>Price</PriceHead>
              <TimeHead>24hrs Change</TimeHead>
              <MarketCapHead>Market Cap</MarketCapHead>
            </TableHead> */}

            {coinList.map((item) => {
              if (watchList.includes(item.id)) {
                return (
                  <Row key={item.id}>
                    <Link to={`/coins/${item?.id}`}>
                      <TableItem item={item} />
                    </Link>

                    <Button
                      title={
                        <AiFillDelete
                          style={{
                            fontSize: "2rem",
                          }}
                        />
                      }
                      onClick={() => removeFromWatchList(item)}
                      style={{
                        marginBottom: "1.5rem",
                      }}
                    />
                  </Row>
                );
              }
            })}
          </List>
        ) : (
          <Span>
            Add coins to your watchlist, track and compare the price of each
            coin.
          </Span>
        )}
      </Watchlist>
    </Container>
  );
};

export default DashboardContainer;
