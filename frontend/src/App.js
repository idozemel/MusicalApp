import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import MyProfilePage from './screens/MyProfilePage/MyProfilePage';
import Header from './components/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/mynotes" element={<MyNotes />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/myProfile" element={<MyProfilePage />} />

          {/* <Route path="/createnote" element={<CreateNote />}/> */}
          {/* <Route path="/note/:id" element={<SingleNote />}/> */}

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
