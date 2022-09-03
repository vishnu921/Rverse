import React from "react"
import {Container} from '@material-ui/core'
import { BrowserRouter, Switch, Route ,Redirect} from "react-router-dom"

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import ReviewDetails from "./components/ReviewDetails/ReviewDetails"

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'))

    return ( 
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route path='/auth' exact component={()=> (!user ? <Auth /> : <Redirect to='/reviews' />)} />
                    <Route path='/' exact component={()=><Redirect to='/reviews'/>} />
                    <Route path='/reviews' exact component={Home} />
                    <Route path='/reviews/search' exact component={Home} />
                    <Route path='/reviews/:id' exact component={ReviewDetails} />
                    
                </Switch>
                
            </Container>
        </BrowserRouter>
     );
}
 
export default App