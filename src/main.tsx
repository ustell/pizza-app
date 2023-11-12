import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';

import './index.css';

import Card from './Pages/Card/Card.tsx';
import Error from './Pages/Error/Error.tsx';
import Layout from './Layout/Menu/Menu.tsx';

import Products from './Pages/Products/Products.tsx';
import axios from 'axios';
import AuthLayout from './Layout/Auth/AuthLayout.tsx';
import Login from './Pages/Login/Login.tsx';
import Register from './Pages/Register/Register.tsx';
import RequireAuth from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./Pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<>Загрузка...</>}>
            <Menu />
          </Suspense>
        ), // suspense нужен для того чтоб упросить нагрузку на сайт то есть загрузка будет происходить только после того как кто юзер зашел на страницу
      },
      {
        path: '/card',
        element: <Card />,
      },
      {
        path: '*',
        element: <Error />,
      },
      {
        path: '/product/:id',
        element: <Products />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          return defer({
            data: new Promise((resolve) => {
              setTimeout(() => {
                axios
                  .get(`https://purpleschool.ru/pizza-api-demo/products/${params.id}`)
                  .then((data) => resolve(data));
              }, 2000);
            }),
            // возвращаем defer хз что то и в него передаем обьект data и в нем уже хранится данные с апи
          });
          // const { data } = await axios.get(
          //   `https://purpleschool.ru/pizza-api-demo/products/${params.id}`,
          // );
          // return data;
        }, // получает все данные которые мы получаем с помощью id и вытаскиваем с них id, name, img и тп и они оказываются в products и там уже с ними работаем с помощью useLoaderData
      },
    ],
  },

  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login></Login>,
      },
      {
        path: 'register',
        element: <Register></Register>,
      },
    ],
  },

  {
    path: '*',
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
