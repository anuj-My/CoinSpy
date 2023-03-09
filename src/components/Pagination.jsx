import styled from "styled-components";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const ButtonLeft = styled.button`
  margin-right: 2rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;

  @media screen and (max-width: 450px) {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
  }

  &:hover {
    color: #6e46ff;
    background-color: #faf8f9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  svg {
    font-size: 2.5rem;
    font-weight: bold;
    @media screen and (max-width: 450px) {
      font-size: 2rem;
    }
  }
`;

const ButtonRight = styled.button`
  margin-left: 2rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;

  @media screen and (max-width: 450px) {
    width: 3rem;
    height: 3rem;
    margin-left: 1rem;
  }

  &:hover {
    color: #6e46ff;
    background-color: #faf8f9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  svg {
    font-size: 2.5rem;
    font-weight: bold;
    @media screen and (max-width: 450px) {
      font-size: 2rem;
    }
  }
`;

const Pages = styled.div``;
const PageNo = styled.span`
  font-size: 2rem;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    font-size: 1.6rem;
  }

  &:hover {
    color: #bcaafc;
  }
  &:not(:last-child) {
    margin-right: 2rem;

    @media screen and (max-width: 450px) {
      margin-right: 1rem;
    }
  }
`;

const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {
  let increment = () => {
    setCurrentPage(++currentPage);
  };

  let decrement = () => {
    setCurrentPage(--currentPage);
  };

  const listPageNo = [...Array(lastPage)].map((_, i) => {
    return (
      <PageNo key={i} onClick={() => setCurrentPage(i + 1)}>
        {i + 1}
      </PageNo>
    );
  });

  return (
    <Container>
      <Wrapper>
        {currentPage > 1 && (
          <ButtonLeft onClick={decrement}>
            <AiOutlineArrowLeft />
          </ButtonLeft>
        )}
        <Pages>{listPageNo}</Pages>
        {currentPage < lastPage && (
          <ButtonRight onClick={increment}>
            <AiOutlineArrowRight />
          </ButtonRight>
        )}
      </Wrapper>
    </Container>
  );
};

export default Pagination;
