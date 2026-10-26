import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main className="app-shell">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/book-table" element={<BookingPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
