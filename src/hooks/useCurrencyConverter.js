import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'your-api-key'; // Replace with your actual API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export function useCurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/codes`);
      setCurrencies(response.data.supported_codes);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch currency list. Please try again later.');
    }
  };

  const fetchRates = async (baseCurrency) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/latest/${baseCurrency}`);
      setRates(response.data.conversion_rates);
      setLastUpdated(new Date(response.data.time_last_update_utc));
      setError(null);
    } catch (err) {
      setError('Failed to fetch exchange rates. Using last known rates.');
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (!rates[toCurrency] || !rates[fromCurrency]) return null;
    
    // Convert via base currency (USD)
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    return (amount / fromRate) * toRate;
  };

  useEffect(() => {
    fetchCurrencies();
    fetchRates('USD'); // Default base currency
  }, []);

  return {
    currencies,
    rates,
    loading,
    error,
    lastUpdated,
    fetchRates,
    convertCurrency,
  };
}