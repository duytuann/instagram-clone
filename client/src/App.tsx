import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';

import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
