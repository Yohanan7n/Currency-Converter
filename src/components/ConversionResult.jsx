import { format } from 'date-fns';

export default function ConversionResult({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  rate,
  lastUpdated,
  loading,
}) {
  if (loading) return null;
  
  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
      {convertedAmount !== null && (
        <>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Conversion Result
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {amount} {fromCurrency} = {convertedAmount.toFixed(4)} {toCurrency}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            1 {fromCurrency} = {rate?.toFixed(6)} {toCurrency}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last updated: {lastUpdated && format(new Date(lastUpdated), 'PPpp')}
          </p>
        </>
      )}
    </div>
  );
}