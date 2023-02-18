import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoContainer = styled.div`
  font-size: 4rem;
`;

const CustomLink = styled(Link)`
  color: #f9f8fa;
  text-decoration: none;
  letter-spacing: 0.6rem;
  span {
    color: #6e46ff;
    font-weight: bold;
  }
`;
const Logo = () => {
  return (
    <LogoContainer>
      <CustomLink to="/">
        Coin<span>Spy</span>
      </CustomLink>
    </LogoContainer>
  );
};

export default Logo;
