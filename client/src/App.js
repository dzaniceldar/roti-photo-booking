import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RoutesList from './routes/routesList';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    // Function to fetch data
    const verifyToken = async () => {
      const authToken = Cookies.get('authData');
      if (authToken) {
        try {
          const response = await fetch('/api/auth/verify-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': authToken },
          });
          if (!response.ok) {
            setAuth(false);
            return;
          }
          const data = await response.json();
          setAuth(data.user);
        } catch {
          setAuth(false);
        }
      } else {
        setAuth(false);
      }
    };
    verifyToken();
  }, []);
  
  return (
    <div 
      className="flex flex-col min-h-screen bg-[#0f1419] text-gray-100"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0f1419', color: '#e5e7eb' }}
    >
        <Header auth={auth} setAuth={setAuth} />
        <RoutesList auth={auth} setAuth={setAuth} />
        <Footer />
    </div>
  );
}

export default App;
