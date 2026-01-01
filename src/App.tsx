import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";
import { AuthProvider } from "./context/auth";
import PublicRoute from "./routes/PublicRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <>
        <Toaster position="top-center" />
        <Routes>

          <Route path="/" element={<Home />}
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
