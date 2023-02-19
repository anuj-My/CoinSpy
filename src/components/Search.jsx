import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContextProvider";

import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";

const Form = styled.form`
  width: 100%;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  border-radius: 6rem;
  padding: 6px 2rem;
  backdrop-filter: blur(4px) saturate(180%);
  margin: 2rem 0;
`;
const SearchInput = styled.input`
  background-color: transparent;
  flex: 1;
  border: 0;
  outline: none;
  padding: 2.4rem 2rem;
  font-size: 2rem;
  color: #cac7ff;

  &::placeholder {
    color: #cac7ff;
  }
`;
const Button = styled.button`
  border: 0;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  background-color: #6e46ff;
  cursor: pointer;

  svg {
    font-size: 2.5rem;
    color: #cac7ff;
  }
`;

const Search = () => {
  const { searchInput, setSearchInput } = useContext(SearchContext);

  console.log(searchInput);
  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };
  
  return (
    <Form>
      <SearchInput
        type="text"
        value={searchInput}
        placeholder="Search for a crypto currency..."
        onChange={searchHandler}
      />
      <Button type="submit">
        <BiSearchAlt />
      </Button>
    </Form>
  );
};

export default Search;
