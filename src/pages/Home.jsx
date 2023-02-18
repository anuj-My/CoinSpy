import styled from "styled-components";
import Banner from "../components/Banner";
import CoinTable from "../components/CoinTable";
import Search from "../components/Search";
import SearchCoinList from "../container/SearchCoinList";

const Home = () => {
  return (
    <div>
      <Banner />
      <SearchCoinList />
    </div>
  );
};

export default Home;
