import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Entity from './pages/Entity';
import Bill from './pages/Bill';
import Tabs from './pages/Tabs';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/bill/:id" element={<Bill />} />
                <Route path="/entity/:id" element={<Entity />} />
                <Route path="/" element={<Tabs />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
