import React, { useEffect, useState } from 'react';

export default function Delete() {
  const [showIframe, setShowIframe] = useState(false);
  const [name, setName] = useState();

  const redirectToGoogle = () => {
    setShowIframe(true);
  };

  useEffect(() => {
    if (showIframe) {
      const timeoutId = setTimeout(() => {
        window.location.href = 'https://www.google.com';
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showIframe]);

  const clicksub = (e) => {
    e.preventDefault();
    const target = e.target;
    const { name } = target;
    setName(name.value);
  };

  return (
    <div>
      <form onSubmit={clicksub}>
        Введите ваш никнейм
        <input type='text' name='name' id='name' />
        <button onClick={redirectToGoogle}>Проверить судьбу</button>
      </form>
      <p>Ваш никнейм {name}</p>
      {showIframe && (
        <iframe
          title='Google'
          src='about:blank'
          width='1'
          height='1'
          frameBorder='0'
          style={{ border: 'none', visibility: 'hidden' }}
        />
      )}
    </div>
  );
}
