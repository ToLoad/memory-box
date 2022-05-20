import React, { useEffect } from 'react';
import AR from '../components/AR';

export default function ar() {
  useEffect(() => {
    return () => {
      const $body = document.querySelector('video');
      if ($body) {
        $body.remove();
        window.location.reload();
      }
    };
  }, []);

  return <AR />;
}
