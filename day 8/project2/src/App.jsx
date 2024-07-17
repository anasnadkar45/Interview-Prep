import React, { useState } from 'react';
import './App.css';
import CheckStrength from './components/CheckStrength';

function App() {
  const [password, setPassword] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder='Enter a password'
        required
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <CheckStrength password={password} />
    </div>
  );
}

export default App;
