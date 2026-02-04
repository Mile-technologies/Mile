import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DashboardPage } from '@/pages/dashboard/page';
import { UsersPage } from '@/pages/users/page';
import { DriversPage } from '@/pages/drivers/page';
import { RidesPage } from '@/pages/rides/page';
import { SettingsPage } from '@/pages/settings/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/rides" element={<RidesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
