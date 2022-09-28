import logo from './logo.svg';
import './App.css';
import UserInfoForm from './UserInfoForm';
import ReactSwitch from 'react-switch';

import {createContext, useState} from 'react';

export const ThemeContext = createContext(null);

function App() {
  const[theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark": "light"));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className="App" id={theme}>
      <UserInfoForm/>
      <div className='toggle-btn'>
        <label className='toggle-label'>{theme} mode</label>
      <ReactSwitch onChange={toggleTheme} checked = {theme === "dark"}></ReactSwitch>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
