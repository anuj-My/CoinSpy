import styled from "styled-components";

const Btn = styled.button`
  padding: 1.4rem 2rem;
  font: 1.6rem;
  color: white;
  background-color: #538dd8;
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  border: none;
`;

const Button = ({ title, ...otherProps }) => {
  return <Btn {...otherProps}>{title}</Btn>;
};

export default Button;
