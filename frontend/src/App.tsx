import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginForm />} />
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
  );
}

export default App;
