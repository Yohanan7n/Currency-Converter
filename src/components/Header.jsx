// components/Header.jsx
export default function Header({ children }) {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Currency Converter</h1>
          <p className="text-blue-100">Get real-time exchange rates</p>
        </div>
        {children}
      </div>
    </header>
  );
}