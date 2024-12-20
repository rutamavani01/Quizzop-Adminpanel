import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from '../Pages/Home';
import Main from '../Components/Main';
import Category from '../Pages/Category';
import Login from '../Pages/Login';
import Quiz from '../Pages/Quiz';
import Setting from '../Pages/Setting';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path='/' element={<Login />} />

            <Route path='/' element={<Main />}>
                <Route path='/dashboard' element={<Home />} />
                <Route path='/category' element={<Category />} />
                <Route path='/quiz' element={<Quiz />}  />
                <Route path='/setting' element={<Setting />}  />
            </Route>
        </RouterRoutes>
    );
}

export default Routes;