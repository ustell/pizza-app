import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import Input from '../../componenst/Input/Input';
import Headling from '../../componenst/Headling/Headling';
import Card from '../../componenst/Card/Card';
import { Product } from '../../Interfase/Product.interface';

import './Menu.scss';

export default function Menu() {
  const [product, setProduct] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const getProduct = async () => {
    try {
      setLoading(true);
      await new Promise<void>((res) => {
        setTimeout(() => {
          res();
        }, 2000);
      });

      const { data } = await axios.get<Product[]>(
        'https://purpleschool.ru/pizza-api-demo/products',
      );

      setProduct(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className='header__top'>
        <Headling>Меню</Headling>
        <Input placeholder='Введите блюдо или состав' />
      </div>
      <div className='menu__category'>
        {error && <>{error}</>}
        {!loading &&
          product?.map((e) => (
            <Card
              key={e.id}
              id={e.id}
              name={e.name}
              price={e.price}
              ingredients={e.ingredients}
              image={e.image}
              rating={e.rating}
            />
          ))}
        {loading && <p>Загрузка пицц</p>}
      </div>
    </>
  );
}
