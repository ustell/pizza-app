import { FormEvent, useEffect } from 'react';
import Headling from '../../componenst/Headling/Headling';
import Input from '../../componenst/Input/Input';
import Button from '../../componenst/Button/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, userAction } from '../../store/user.slice';
import { AppDispath, RootState } from '../../store/store';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const { jwt, registerInvalid } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const Submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & RegisterForm;

    const { email, password, name } = target;
    dispatch(userAction.clearRegisterInvalid());
    dispatch(register({ email: email.value, password: password.value, name: name.value }));
  };

  return (
    <div className='login'>
      <Headling>Регистрация</Headling>
      {registerInvalid && <p className='error'>{registerInvalid}</p>}

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
          <div className='password input__wrapper'>
            <label className='input__label' htmlFor='password'>
              Ваше имя
            </label>
            <Input id='name' name='name' placeholder='Имя' />
          </div>
        </div>
        <Button apperanse='big' className='form__btn'>
          Зарегестрируйтесь
        </Button>
      </form>

      <div className='login__hint'>
        <p>Есть аккаунт?</p>
        <NavLink to='/auth/register' className='login_to_reg'>
          Ввойти
        </NavLink>
      </div>
    </div>
  );
}
