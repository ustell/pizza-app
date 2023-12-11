import React from 'react';

import './CardItem.scss';

export default function CardItem() {
  return (
    <div className='cardItem'>
      <div className='card__info'>
        <div className='card__info-img'>
          <img src='./pizza_1.png' alt='pizza' className='card__info-img' />
        </div>
        <div className='card__info-content'>
          <p className='card__info-name'>Аццки острая</p>
          <p className='card__info-price'>320 ₽</p>
        </div>
      </div>
      <div className='card__interactions'>
        <div className='card__interactions-button'>
          <button className='btn__count'>
            <img src='./minus.svg' alt='' />
          </button>
          <p>count</p>
          <button className='btn__count'>
            <img src='./plus.svg' alt='' />
          </button>
        </div>
        <button className='btn__count dell'></button>
      </div>
    </div>
  );
}
