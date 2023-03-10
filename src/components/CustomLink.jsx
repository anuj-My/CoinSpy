import { NavLink } from "react-router-dom";

const CustomLink = ({ data }) => {
  function activeLinkStyles({ isActive }) {
    if (isActive) {
      return {
        color: "white",
        backgroundColor: "#6e46ff",
        padding: "1rem 2rem",
        borderRadius: ".5rem",
      };
    } else {
      return {
        color: "white",
        padding: "1rem",
      };
    }
    // return {
    //   color: isActive && "#b20c0c ",
    //   backgroundColor: isActive && "blue ",
    // };
  }
  const { path, title } = data;
  return (
    <NavLink to={path} style={activeLinkStyles} end>
      {title}
    </NavLink>
  );
};

export default CustomLink;
