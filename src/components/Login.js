import React from "react";

function Login({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const authSubmit = (evt) => {
    onSubmit(evt, { email, password });
  };
  return (
    <div className="register">
      <h1 className="register__title">Вход</h1>
      <form className="register__form" onSubmit={authSubmit}>
        <input
          className="register__input"
          type="email"
          value={email}
          placeholder="email"
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />
        <input
          className="register__input"
          type="password"
          placeholder="пароль"
          value={password}
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
        <button className="register__button-save " type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
