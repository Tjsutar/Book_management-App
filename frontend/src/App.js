import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import BookDetail from './components/BookDetail';
import Navbar from './components/Navbar';
const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/add" component={AddBook} />
                <Route path="/edit/:id" component={EditBook} />
                <Route path="/book/:id" component={BookDetail} />
            </Switch>
        </Router>
    );
};

export default App;
