import { AppLayout } from './layouts/AppLayout';
import { BillsPage } from './pages/BillsPage';
import { Home } from './pages/HomePage';
import { Route, Routes, HashRouter } from "react-router-dom";
import { SettingsPage } from './pages/SettingsPage';
import { InfoPage } from './pages/InfoPage';

export function App() {
    return (
        <div className="h-screen dark:bg-slate-700">
            <HashRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="bills" element={<BillsPage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="info" element={<InfoPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

