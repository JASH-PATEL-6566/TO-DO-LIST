import React, { useEffect, useReducer, useState } from 'react';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
import reducerForList from './reducerForList';

const defaultState = {
    active: '',
    list: []
}

const Layout = () => {
    const [state, dispatch] = useReducer(reducerForList, defaultState);
    const [todo, setTodo] = useState([])

    return (
        <div className="main_container">
            <div className="left_container">
                <LeftLayout state={state} dispatch={dispatch} todo={todo} setTodo={setTodo} />
            </div>
            <div className="right_container">
                <RightLayout state={state} dispatch={dispatch} todo={todo} setTodo={setTodo} />
            </div>
        </div>
    )
}

export default Layout;