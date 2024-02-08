import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import { asyncPreloadProcess } from './states/isPreload/action';
import DetailPage from './pages/DetailPage';

function App() {
  const {
    authUser,
    isPreload
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch])

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="app-container">
        <header>
          <h1>Forum App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App
