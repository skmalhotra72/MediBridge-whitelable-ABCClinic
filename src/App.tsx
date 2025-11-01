import { Home } from './pages/Home';
import { Admin } from './pages/Admin';

function App() {
  const isAdminRoute = window.location.pathname === '/admin';

  return isAdminRoute ? <Admin /> : <Home />;
}

export default App;
