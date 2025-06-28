import { useState, useMemo } from 'react';
// Removed unused import Search from '@mui/icons-material';
import './App.css';
import AllPosts from './components/AllPosts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './components/Create';
import Navbar from './components/Navbar';
import Edit from './components/Edit';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

function App() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => 
    mode === 'light' ? lightTheme : darkTheme,
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AllPosts mode={mode} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
