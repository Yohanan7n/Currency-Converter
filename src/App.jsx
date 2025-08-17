import { useState, useEffect } from 'react';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import Header from './components/Header';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import ConversionResult from './components/ConversionResult';
import ErrorMessage from './components/ErrorMessage';
import { FiMoon, FiSun } from 'react-icons/fi';

function App() {
  const {
    currencies,
    rates,
    loading,
    error,
    lastUpdated,
    fetchRates,
    convertCurrency,
  } = useCurrencyConverter();

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleConvert = () => {
    if (amount && fromCurrency && toCurrency) {
      const result = convertCurrency(amount, fromCurrency, toCurrency);
      setConvertedAmount(result);
    }
  };

  const handleCurrencyChange = (type, currency) => {
    if (type === 'from') {
      setFromCurrency(currency);
      fetchRates(currency);
    } else {
      setToCurrency(currency);
    }
    setConvertedAmount(null);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </Header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && <ErrorMessage message={error} />}
          
          <div className="space-y-4">
            <AmountInput 
              amount={amount} 
              onAmountChange={setAmount} 
            />
            
            <CurrencySelector
              label="From"
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onCurrencyChange={(currency) => handleCurrencyChange('from', currency)}
            />
            
            <button
              onClick={swapCurrencies}
              className="w-full py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              Swap Currencies
            </button>
            
            <CurrencySelector
              label="To"
              currencies={currencies}
              selectedCurrency={toCurrency}
              onCurrencyChange={(currency) => handleCurrencyChange('to', currency)}
            />
            
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Convert'}
            </button>
            
            <ConversionResult
              amount={amount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              convertedAmount={convertedAmount}
              rate={rates[toCurrency]}
              lastUpdated={lastUpdated}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;