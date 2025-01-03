import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import Home from '../Pages/Home';
import Main from '../Components/Main';
import Category from '../Pages/Category';
import Login from '../Pages/Login';
import Quiz from '../Pages/Quiz';
import Setting from '../Pages/Setting';
import Category_edit from '../Pages/Category_edit';
import { EditQuiz } from '../Pages/EditQuiz';
import EditSetting from '../Pages/EditSetting';
import Rules from '../Pages/Rules';
import EditRules from '../Pages/EditRules';
import View_CategoryQuiz from '../Pages/View_CategoryQuiz';
import Pages from '../Pages/Pages';
import ViewPageAlldata from '../Pages/ViewPageAlldata';
import EditPages from '../Pages/EditPages';
import Notification from '../Pages/Notification';

const Routes = () => {
    return (
        <RouterRoutes>
            <Route path='/' element={<Login />} />

            <Route path='/' element={<Main />}>
                <Route path='/dashboard' element={<Home />} />

                <Route path='/category' element={<Category />} />
                <Route path="/edit-category/:id" element={<Category_edit />} />

                <Route path="/view-categoryquiz/:id" element={<View_CategoryQuiz />} />


                <Route path='/quiz' element={<Quiz />} />
                <Route path="/edit-quiz/:id" element={<EditQuiz />} />

                <Route path='/setting' element={<Setting />} />
                <Route path="/edit-setting/:id" element={<EditSetting />} />


                <Route path='/rules' element={<Rules />} />
                <Route path='/edit-rules/:id' element={<EditRules />} />

                <Route path='/pages' element={<Pages />} />
                <Route path='/edit-pages/:id' element={<EditPages />} />
                <Route path='/view-page-alldata' element={<ViewPageAlldata />} />

                <Route path='/notification' element={<Notification />} />

            </Route>
        </RouterRoutes>
    );
}

export default Routes;