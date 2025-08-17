export default function CurrencySelector({ label, currencies, selectedCurrency, onCurrencyChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
      >
        {currencies.map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
}