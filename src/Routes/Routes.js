import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from '../Pages/Home';
import Main from '../Components/Main';
import Category from '../Pages/Category';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path='/' element={<Main />}>
                <Route index element={<Home />} />
                <Route path='/category' element={<Category />}/>
            </Route>
        </RouterRoutes>
    );
}

export default Routes;
