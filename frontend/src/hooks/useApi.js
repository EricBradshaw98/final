import { useEffect, useReducer } from 'react';

const apiKey = '5zppMBtonCBY1SJ42kijFfL2V7co5_MN';
const baseUrl = 'https://api.polygon.io/v2';

// Define your reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Define your custom hook
const useApi = (endpoint) => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Stock data fetched successfully:", data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();

  }, [endpoint]);

  return state;
};

export default useApi;
