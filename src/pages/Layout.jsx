import { Outlet, Link} from "react-router-dom";
import { useState } from "react";
import '../App.css'

export default function Layout(){
    
    return(
        <div /*style={{position: "absolute", left: "10px", top: "10px"}}*/ className="container-layout">
            <div>
                <nav className="container-nav">
                    <ul>
                        <li>
                            <Link to={"/"}>Início</Link>
                        </li>

                        <li>
                            <Link to={"/cotacao"}>Cotação</Link>
                        </li>

                        <li>
                            <Link to={"/kanban"}>Kanban Orçamentos</Link>
                        </li>
                    </ul>
                </nav>
                <Outlet/>
            </div>
        </div>
    )
}
