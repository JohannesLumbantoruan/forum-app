import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import DetailPage from './pages/DetailPage';
import Navigation from './components/Navigation';
import AddPage from './pages/AddPage';
import LeaderboardsPage from './pages/LeaderboardsPage';

function App() {
  const {
    authUser,
    isPreload,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <LoadingBar />
        <div className="app-container">
          <header>
            <Navigation />
          </header>
          <main>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <LoadingBar />
      <div className="app-container">
        <header>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
            <Route path="/threads/add" element={<AddPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
