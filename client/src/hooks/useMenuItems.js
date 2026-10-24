import { useEffect, useState } from 'react';
import { getMenuItems } from '../services/api';

function useMenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getMenuItems()
      .then((response) => {
        if (active) setMenuItems(response.data);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { menuItems, isLoading, error };
}

export default useMenuItems;
