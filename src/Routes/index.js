//archivo que exporta todas las rutas
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import Home from "./Views/Home";
import FourOFour from "./Views/Home/404";
import PokeDetail from "./Views/PokeDetail"
import ScrollToTop from "../components/ScrollToTop";
export default function Routes(){
    return(
        <Router>
            <ScrollToTop/>
            <Switch>
            <Route path= "/" exact>
                <Home/>
            </Route>
            <Route path="/pokemon/:id"> {/*Parametro dinamico*/}
                <PokeDetail/>
            </Route>
            <Route >
                <FourOFour/>
            </Route>
            </Switch>
        </Router>
    );
}