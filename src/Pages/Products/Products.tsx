import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../Interfase/Product.interface';

export default function Products() {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense fallback={<>Загрузка...</>}>
        <Await resolve={data.data} errorElement={<>Что то пошло не так</>}>
          {/* resolve получает то что нужно вернуть в данном случае он получает обьект в котором все хранится затем он через data.data выводит данные с этого обьекта */}
          {({ data }: { data: Product }) => <>Название {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}

// что нужно вернуть
