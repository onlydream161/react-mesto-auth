import Vector from "../images/Vector.svg";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
function Header({ onClick, emailUser }) {
  const [isLink, setLink] = React.useState("");
  const [isNamelink, setIsNameLink] = React.useState("");
  const location = useLocation();
  const correctLocation = location.pathname;
  useEffect(() => {
    switch (correctLocation) {
      case "/sign-up":
        setLink("/sign-in");
        setIsNameLink("Войти");
        break;
      case "/sign-in":
        setLink("/sign-up");
        setIsNameLink("Регистрация");
        break;
      default:
        setLink("/");
        setIsNameLink("Выйти");
    }
  });
  return (
    <header className="header page__header">
      <img className=" header__logo" src={Vector} alt="Логотип Место" />
      <div className="header__navbar">
        {emailUser && <p className="header__email">{emailUser}</p>}
        <Link className="header__link" onClick={onClick} to={isLink}>
          {isNamelink}
        </Link>
      </div>
    </header>
  );
}
export default Header;
