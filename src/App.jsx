import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Cotacoes from "./cotacao/Cotacoes";
import Board from "./kanban/Board";
import tarifarioTable from "./tarifario/tarifarioTable"
import './App.css'

export default function App(){
  return(
    <div className="container-principal">
      <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="cotacao" element={<Cotacoes/>}/>
          <Route path="kanban" element={<Board/>}/>
          <Route path="tarifario" element={<tarifarioTable/>}/>
          <Route/>
        </Route>
      </Routes>
    </Router>
    </div>
    
  )
}
