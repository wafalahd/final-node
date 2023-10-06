import React, { Component } from 'react'; // Import React from 'react'
import AddItem from './AddItem';
import Home from './Home';
import { Routes, Route, Navigate } from 'react-router-dom'; // Corrected import name
import { connect } from 'react-redux';
import Cart from './Cart';
import Order from './Order'; // Corrected component name

class Main extends Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route path='/home'>
                        <Home />
                    </Route>
                    <Route path='/addItem'>
                        <AddItem />
                    </Route>
                    <Route path='/cart'>
                        <Cart />
                    </Route>
                    <Route path='/orders'>
                        <Order /> {/* Corrected component name */}
                    </Route>
                    <Navigate to='/home' />
                </Routes>
            </div>
        );
    }
}

export default connect()(Main); // Removed withRouter
