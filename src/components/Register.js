import { Link } from "react-router-dom";
import React from "react";

function Register({onSubmit}) {
const [email, setEmail]=React.useState('');
const [password, setPassword]= React.useState('')
    const registerSubmit=(evt)=>{
    onSubmit(evt,{
        email,
        password
    })    

    }
  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={registerSubmit}>
        <input className="register__input" type="email" placeholder="email" value={email} onChange={(evt)=>{setEmail(evt.target.value)}}/>
        <input className="register__input" type="password" placeholder="пароль" value={password} onChange={(evt)=>{setPassword(evt.target.value)}} />
        <button className="register__button-save " type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__description">Уже зарегистрированы? <Link to="/sign-in" className="register__sing-in">Войти</Link> </p>
    </div>
  );
}
export default Register;
