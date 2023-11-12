import React, { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { LoginToken } from '../../Interfase/Auth.interface';

import Button from '../../componenst/Button/Button';
import Headling from '../../componenst/Headling/Headling';
import Input from '../../componenst/Input/Input';

import './Login.scss';
import { AppDispath } from '../../store/store';
import { userAction } from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export default function Login() {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

  const Submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm;

    const { email, password } = target;
    setError(null);
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginToken>(
        'https://purpleschool.ru/pizza-api-demo/auth/login',
        {
          email,
          password,
        },
      );
      localStorage.setItem('jwt', data.access_token);
      dispatch(userAction.addJwt(data.access_token));
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className='login'>
      <Headling>Авторизация</Headling>
      {error && <p className='error'>{error}</p>}

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
