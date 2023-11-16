import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import './Menu.scss';
import Button from '../../componenst/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { userAction } from '../../store/user.slice';

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

  const ExitAcount = () => {
    dispatch(userAction.logout());
    navigate('/auth/login');
  };

  return (
    <>
      <div className='layout'>
        <div className='sidebar'>
          <div className='user'>
            <div className='user__avatar'>
              <img src='./avatar.png' alt='' />
            </div>
            <div className='user__info'>
              <h2 className='user__info-name'> Барабанов Олег </h2>
              <h2 className='user__info-email'> Boleg748@gmail.com </h2>
            </div>
          </div>

          <nav className='menu'>
            <ul className='menu__list'>
              <li>
                <img src='./menu.svg' alt='menu' />
                <NavLink to={'/'}>Меню</NavLink>
              </li>
              <li>
                <img src='./card.svg' alt='card' />
                <NavLink to={'/card'}>Корзина</NavLink>
                <p className='menu__count'>2</p>
              </li>
            </ul>
          </nav>

          <Button className='exit' onClick={ExitAcount}>
            <img src='./exit-icon.svg' alt='Иконка выхода' />
            Выход
          </Button>
        </div>
        <main className='main'>
          <Outlet />
        </main>
      </div>
    </>
  );
}
