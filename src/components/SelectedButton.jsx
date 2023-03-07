import styled from "styled-components";

const Btn = styled.button`
  padding: 2rem 3rem;
  font: 1.6rem;
  color: white;
  background-color: ${({ isSelected }) => (isSelected ? "#538dd8" : "#6dacff")};
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  border: none;

  @media screen and (max-width: 760px) {
    padding: 1.5rem 2rem;
  }
`;

const SelectedButton = ({ options }) => {
  const { title, color, backgroundColor, clickHandler, isSelected } = options;
  return (
    <Btn
      isSelected={isSelected}
      color={color}
      backgroundColor={backgroundColor}
      onClick={clickHandler}
    >
      {title}
    </Btn>
  );
};

export default SelectedButton;
