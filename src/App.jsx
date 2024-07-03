import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cotacoes from "./cotacao/Cotacoes";
import './App.css'

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="cotacao" element={<Cotacoes/>}/>
          <Route/>
        </Route>
      </Routes>
    </Router>
  )
}
