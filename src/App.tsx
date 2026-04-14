import { useState, useCallback } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { BillsPage } from './pages/BillsPage';
import { Home } from './pages/HomePage';
import { Route, Routes, HashRouter } from "react-router-dom";
import { SettingsPage } from './pages/SettingsPage';
import { InfoPage } from './pages/InfoPage';
import { SplashScreen, shouldShowSplash } from './components/SplashScreen';
import { DisclaimerModal } from './components/DisclaimerModal';

export function App() {
    const [showSplash, setShowSplash] = useState(() => shouldShowSplash());
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const handleSplashFinished = useCallback(() => {
        setShowSplash(false);
        if (!sessionStorage.getItem('disclaimer_shown')) {
            setShowDisclaimer(true);
        }
    }, []);

    const handleDisclaimerClose = useCallback(() => {
        sessionStorage.setItem('disclaimer_shown', 'true');
        setShowDisclaimer(false);
    }, []);

    return (
        <div className="h-screen dark:bg-slate-700">
            {showSplash && <SplashScreen onFinished={handleSplashFinished} />}
            {!showSplash && showDisclaimer && <DisclaimerModal onClose={handleDisclaimerClose} />}
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
