import React, { useEffect, useRef, useState } from 'react'
import add from '../../Images/plus.png'
import remove from '../../Images/delete.png'
import axios from 'axios';
import mongoose from 'mongoose';
const SERVER_URL = 'http://localhost:9002/';

const RightLayout = ({ setActive, active }) => {
    const input = useRef(null);
    const [title, setTitle] = useState('');
    const [activeList, setActiveList] = useState({});
    const [todos, SetTodos] = useState([]);

    const getData = () => {
        axios.get(SERVER_URL)
            .then((ans) => {
                setActive(ans.data.active)
                setActiveList(ans.data.activeList)
                SetTodos(ans.data.todos);
            })
        input.current && input.current.focus();
    }

    // console.log('right');

    useEffect(() => {
        getData();
    }, [active])


    const handleTodoSubmit = (e) => {
        e.preventDefault();
        axios.post(SERVER_URL, { id: new mongoose.Types.ObjectId().toHexString(), name: title, active: active, message: 'ADD_TODO' })
            .then(() => getData());
        input.current.focus();
        setTitle('');
    }

    const handleDeleteTodo = (id) => {
        axios.post(SERVER_URL, { active, id, message: 'DELETE_TODO' })
            .then(() => getData())
    }

    // console.log(todos);
    return (
        <>
            {(active && activeList) && <>
                <div className="add_dos_container">
                    <div className="add_dos_input" onSubmit={handleTodoSubmit}>
                        <form className='form'>
                            <input ref={input} autoFocus type="text" id='dos_input' className='dos_input' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <button type='submit' className="add_dos_btn" >
                                <img className="add_dos_btn_img" src={add} alt="add" />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="main_dos_container">
                    {activeList && todos.map((item) =>
                        <div className="dos_container" key={item._id}>
                            <div className="dos_name">
                                {item.name}
                                {/* jash */}
                            </div>
                            <div className="remove_dos_container">
                                <button className='remove_dos_btn'>
                                    <img className='remove_dos_img' src={remove} alt="remove" id={item._id} onClick={(e) => handleDeleteTodo(e.target.getAttribute('id'))} />
                                </button>
                            </div>
                        </div>
                    )
                    }
                </div>

                {/* upper most heading */}
                <div className="add_dos_inner_container">
                    <h2 className='add_dos_inner_text'>{activeList.name || ''}</h2>
                </div>
            </>}

            {!active && <>
                <div className="inner-container">
                    <h1>No List is select yet</h1>
                </div>
            </>}
        </>
    )
}
export default RightLayout;