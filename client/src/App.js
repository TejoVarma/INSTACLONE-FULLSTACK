import React from 'react';
import './styles/App.css';
import './styles/Authentication.css';
import './styles/HomePage.css';
import './styles/ProfilePage.css';
import PostViewContext from './contexts/PostViewContext';
import Routers from './routes/Routers';

function App() {
  return (
    <PostViewContext>
      <div className='wrapper'>
        <Routers />
      </div>
    </PostViewContext>
  );
}

export default App;
