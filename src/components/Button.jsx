import styled from "styled-components";

const Btn = styled.button`
  padding: 2rem 3rem;
  font: 1.6rem;
  color: white;
  background-color: #538dd8;
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  border: none;
`;

const Button = ({ options }) => {
  const { title, color, backgroundColor, clickHandler } = options;
  return (
    <Btn color={color} backgroundColor={backgroundColor} onClick={clickHandler}>
      {title}
    </Btn>
  );
};

export default Button;
