import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContextProvider";

const Container = styled.section`
  width: 85%;
  margin: 13rem auto;
`;

const Profile = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 15rem;
  height: 15rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const UserName = styled.h1`
  font-size: 5rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Watchlist = styled.div`
  background-color: black;
  margin-top: 5rem;
  padding: 1rem;
  border-radius: 1rem;
`;
const Head = styled.h3`
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin-bottom: 2.5rem;
  font-size: 2.4rem;
`;

const List = styled.div``;
const Span = styled.span`
  font-size: 2rem;
  opacity: 0.5;
`;

const DashboardContainer = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Container>
      <Profile>
        <ImageContainer>
          <Image
            src={currentUser.photoURL}
            alt={currentUser.displayName || currentUser.email}
          />
        </ImageContainer>
        <UserName>{currentUser?.displayName}</UserName>
      </Profile>

      <Watchlist>
        <Head>WatchList</Head>

        <List>
          <Span>
            Add coins to your watchlist, track and compare the price of each
            coin.
          </Span>
        </List>
      </Watchlist>
    </Container>
  );
};

export default DashboardContainer;
