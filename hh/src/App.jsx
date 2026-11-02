import { BrowserRouter, Routes, Route } from "react-router"
import { ThemeProvider } from "./context/ThemeContext"
import AuthFlow from "./pages/AuthFlow"
import Login from "./pages/Login"
import NewHome from "./pages/NewHome"
import Info from "./pages/Info"
import Favorites from "./pages/Favorites"
import Cart from "./pages/Cart"
import Prodduct from "./pages/Prodduct"
import Abaut from "./pages/Abaut"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthFlow>
                <Login />
              </AuthFlow>
            }
          />

          <Route
            path="/"
            element={
              <AuthFlow>
                <NewHome />
              </AuthFlow>
            }
          />

          {/* This route renders the page exported from pages/Abaut.jsx. */}
          <Route path="/abaut" element={<AuthFlow><Abaut /></AuthFlow>} />

          <Route
            path="/favorites"
            element={
              <AuthFlow>
                <Favorites />
              </AuthFlow>
            }
          />

          <Route
            path="/cart"
            element={
              <AuthFlow>
                <Cart />
              </AuthFlow>
            }
          />

          <Route
            path="/checkout"
            element={
              <AuthFlow>
                <Prodduct />
              </AuthFlow>
            }
          />

          <Route
            path="/prodduct"
            element={
              <AuthFlow>
                <Prodduct />
              </AuthFlow>
            }
          />

          <Route
            path="/product/:id"
            element={
              <AuthFlow>
                <Info />
              </AuthFlow>
            }
          />

          <Route path="/info/:id" element={<AuthFlow><Info /></AuthFlow>} />

          <Route path="/info" element={<AuthFlow><Info /></AuthFlow>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
