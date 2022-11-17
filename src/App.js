import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages';
import SigninPage from './pages/signin';
import signupPage from './pages/signup';
import Apply from './Apply';
import organiser from './pages/organiser';
import candidate from './pages/candidate';
import addCandidate from './pages/addCandidate'
import addSubject from './pages/addSubject';
import Redirection from './pages/redirect';
import RedirectId from "./pages/RedirectId";
import AddElectors from "./pages/AddElectors";
import Vote from "./pages/Vote"
import AddSubject from "./pages/addSubject";
import DashBoard from "./pages/DashBoard";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/signin' component={SigninPage} exact/>
                <Route path='/signup' component={signupPage}/>
                <Route path='/organisation' component={organiser}/>
                <Route path='/candidate' component={candidate}/>
                <Route path='/addSubject' component={AddSubject}/>
                <Route path="/dashboard" component={DashBoard}/>

                <Route path='/redirect' component={Redirection}/>
                <Route path='/vote' component={Vote}/>
                <Route path='/addCandidate' component={addCandidate}/>
                <Route path='/addElector' component={AddElectors}/>
                <Route path='/addSubject' component={addSubject}/>
                <Route path='/addSubject' component={addSubject}/>

                <Route path='*' component={Home}/>


            </Switch>
        </Router>
    );
}

export default App;
