import React, { FormEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../componenst/Button/Button';
import Headling from '../../componenst/Headling/Headling';
import Input from '../../componenst/Input/Input';

import './Login.scss';
import { AppDispath, RootState } from '../../store/store';
import { login, userAction } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const { jwt, loginInvalid } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const Submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm;

    const { email, password } = target;
    dispatch(userAction.clearLoginError());
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className='login'>
      <Headling>Авторизация</Headling>
      {loginInvalid && <p className='error'>{loginInvalid}</p>}

      <form className='form' onSubmit={Submit}>
        <div className='input__form'>
          <div className='email input__wrapper'>
            <label className='input__label' htmlFor='email'>
              Ваш email
            </label>
            <Input id='email' name='email' type='email' placeholder='Email' />
          </div>
          <div className='password input__wrapper'>
            <label className='input__label' htmlFor='password'>
              Ваш пароль
            </label>
            <Input id='password' name='password' type='password' placeholder='Пароль' />
          </div>
        </div>
        <Button apperanse='big' className='form__btn'>
          Вход
        </Button>
      </form>

      <div className='login__hint'>
        <p>Нет аккаунта?</p>
        <NavLink to='/auth/register' className='login_to_reg'>
          Зарегестируйтесь
        </NavLink>
      </div>
    </div>
  );
}
