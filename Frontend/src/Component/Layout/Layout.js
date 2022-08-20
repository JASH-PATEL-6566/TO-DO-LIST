import React, { useState } from 'react';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
// import reducerForList from './reducerForList';

const Layout = () => {

    const [active, setActive] = useState('');

    return (
        <div className="main_container">
            <div className="left_container" >
                <LeftLayout setActive={setActive} active={active} />
            </div>
            <div className="right_container" >
                <RightLayout setActive={setActive} active={active} />
            </div>
        </div>
    )
}

export default Layout;