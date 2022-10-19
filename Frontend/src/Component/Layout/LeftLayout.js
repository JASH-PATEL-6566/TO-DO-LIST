import React, { useEffect, useRef, useState } from 'react'
import plus_image from "../../Images/plus.png";
import delete_image from '../../Images/delete.png'
import axios from 'axios';

const SERVER_URL = 'http://localhost:9002/'

// console.log('dasdas');
const LeftLayout = ({ setActive }) => {
    const [listName, setListName] = useState('');
    const input = useRef(null)
    const text = useRef(null)
    const [list, setList] = useState([]);

    const fetch_data = () => {
        // console.log('in');
        axios.get(SERVER_URL, { message: 'FETCH' })
            .then(result => {
                setList(result.data.list)
                setActive(result.data.active)
            })
    }
    // console.log('left');

    useEffect(() => {
        fetch_data();
    }, [])

    const toggleTextAndInput = () => {
        text.current.classList.toggle('display_none');
        input.current.classList.toggle('display_none');
        input.current.focus();
    }

    // console.log('hello');

    const handleListNameSubmit = (e) => {
        e.preventDefault();

        axios.post(SERVER_URL, { name: listName, message: 'ADD_LIST' })
            .then(() => fetch_data())
        input.current.focus();
        setListName('');
    }

    const delete_list = (id) => {
        // console.log(id);
        axios.post(SERVER_URL, { id: id, message: 'DELETE_LIST' })
            .then(() => fetch_data())
    }

    const change_active = (id) => {
        axios.post(SERVER_URL, { id: id, message: 'CHANGE_ACTIVE' })
            .then(() => fetch_data())
    }

    return (
        <>
            <div className="left_upper">
                <div className="add_list_btn_container">
                    <button className='add_list_btn' onClick={toggleTextAndInput}>
                        <img className='add_list_img' src={plus_image} alt="Plus" />
                    </button>
                </div>
                <div className="add_list_input_container">
                    <div className='add_list_text' ref={text}>Add New List</div>
                    <form onSubmit={handleListNameSubmit} >
                        <input className='add_list_input display_none' ref={input} type="text" value={listName} onChange={(e) => setListName(e.target.value)} />
                    </form>
                </div>
            </div>
            <div className="left_lower">
                {list.map((item) => {
                    const { _id, name } = item;
                    return (
                        <div div className="list_container" key={_id} >
                            <div className="list_name" id={_id} onClick={(e) => {
                                change_active(e.target.getAttribute('id'))
                            }}>
                                {name}
                            </div>
                            <div className="remove_list_container display_none">
                                <button
                                    className='remove_list_btn'>
                                    <img src={delete_image} className="remove_list_img" alt="delete" id={_id} onClick={(e) => delete_list(e.target.getAttribute('id'))} />
                                </button>
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </>
    )
}

export default LeftLayout;