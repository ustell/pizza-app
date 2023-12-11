import React, { MouseEvent } from 'react';

import './Card.scss';
import { NavLink } from 'react-router-dom';
import { Product } from '../../Interfase/Product.interface';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { CardAction } from '../../store/card.slice';

export default function Card(props: Product) {
  const dispatch = useDispatch<AppDispath>();

  const add_to_card = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(CardAction.addCard(props.id));
  };

  return (
    <NavLink to={`/product/${props.id}`} className='menu__link'>
      <div className='menu__card'>
        <div className='menu__card-images'>
          <img className='menu__card-images--img' src={props.image} alt='' />
          <p className='menu__card-price'>
            {props.price} <span>₽</span>
          </p>
          <p className='menu__card-add' onClick={add_to_card}>
            <img src='./add_card.svg' alt='' />
          </p>
          <p className='menu__card-rating'>
            {props.rating}
            <span>
              <img src='./star.svg' alt='' />
            </span>
          </p>
        </div>
        <div className='menu__card-info'>
          <h2 className='menu_card-title'>{props.name}</h2>
          <p className='menu_card-ingredients'>{props.ingredients.join(', ')}</p>
        </div>
      </div>
    </NavLink>
  );
}
