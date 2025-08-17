export default function AmountInput({ amount, onAmountChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Amount
      </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        min="0"
        step="0.01"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter amount"
      />
    </div>
  );
}