import styled from "styled-components";

const Btn = styled.button`
  background-color: #7474cb;
  padding: 1.4rem 2.2rem;
  font: 1.6rem;
  color: white;
  opacity: 0.75;
  transition: all 0.4s ease;
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  svg {
    font-size: 2rem;
  }

  &:hover {
    opacity: 1;
  }
`;

const Button = ({ title, icon, ...otherProps }) => {
  return (
    <Btn {...otherProps}>
      {icon} {title}
    </Btn>
  );
};

export default Button;
