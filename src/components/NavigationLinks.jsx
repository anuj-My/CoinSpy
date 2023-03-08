import styled from "styled-components";
import CustomLink from "./CustomLink";
import { linksData } from "../data";
const NavigationLinksContainer = styled.div`
  font-size: 1.6rem;
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 3rem;
  }
`;
const NavigationLinks = () => {
  const linklist = linksData.map((data, index) => {
    return <CustomLink key={index} data={data} />;
  });
  return <NavigationLinksContainer>{linklist}</NavigationLinksContainer>;
};

export default NavigationLinks;
