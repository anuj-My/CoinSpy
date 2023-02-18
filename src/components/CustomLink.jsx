import styled from "styled-components";
import { Link } from "react-router-dom";
const CustomLinkContainer = styled(Link)`
  font-size: 1.6rem;
  text-decoration: none;
  color: #f8f9fa;
`;

const CustomLink = ({ data }) => {
  const { path, title } = data;
  return <CustomLinkContainer to={path}>{title}</CustomLinkContainer>;
};

export default CustomLink;
