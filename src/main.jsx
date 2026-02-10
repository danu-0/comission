import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './page/home/Nav'
import Hero from './page/home/Hero';
import Content from './page/home/Content';
import Footer from './page/home/Footer';
import About from './page/home/About';
import Order from './page/order/Order';
import Splash from './Splash';
import './style/index.css';
import Gallery from './page/home/Galery';
import Feature from './page/home/Feature';
import InvoicePage from './page/invoice/GenerateInvoice';
import FeedbackPage from './page/feedback/FeedbackPage';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <Router basename='/'>
      <Routes>
        <Route
          path="/"
          element={[
            <Nav key="nav" />,
            <Hero key="hero" />,
            <About key="about" />,
            <Content key="content" />,
            <Gallery key="gallery" />,
            <Feature key="feature"/>,
            <Footer key="footer" />,
          ]}
        />
        <Route path="order" element={<Order />} />
        <Route path="generate-invoice" element={<InvoicePage/>} />
        <Route path="feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
