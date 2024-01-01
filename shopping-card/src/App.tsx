import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { ShoppingCardProvider } from "./context/ShoppingCardContex"


function App() {

  return (
    <ShoppingCardProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Store" element={<Store />}></Route>
          <Route path="/About" element={<About />}></Route>
        </Routes>
      </Container>
    </ShoppingCardProvider>
  )
}

export default App
