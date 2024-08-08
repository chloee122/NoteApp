import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthPage from "./components/AuthPage/AuthPage";
import MainPage from "./components/MainPage/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import GlobalStyles from "./globalStyle";
import useAxiosInterceptors from "./hooks/useAxiosInterceptors";

function App() {
  useAxiosInterceptors();
  return (
    <>
      <ToastContainer position="top-left" theme="light" />
      <GlobalStyles />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
