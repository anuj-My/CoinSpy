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

const Button = styled.button`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;

  &:hover {
    color: #6e46ff;
    background-color: #faf8f9;
  }
  svg {
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const Pages = styled.div``;
const PageNo = styled.span`
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    color: #bcaafc;
  }
  &:not(:last-child) {
    margin-right: 2rem;
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
          <Button style={{ marginRight: "2rem" }} onClick={decrement}>
            <AiOutlineArrowLeft />
          </Button>
        )}
        <Pages>{listPageNo}</Pages>
        {currentPage < lastPage && (
          <Button style={{ marginLeft: "2rem" }} onClick={increment}>
            <AiOutlineArrowRight />
          </Button>
        )}
      </Wrapper>
    </Container>
  );
};

export default Pagination;
