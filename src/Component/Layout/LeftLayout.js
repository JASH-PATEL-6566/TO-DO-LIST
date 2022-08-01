import React, { useState, useRef, useReducer } from 'react'
import plus_image from "../../Images/plus.png";
import delete_image from '../../Images/delete.png'

const LeftLayout = (props) => {
    const [name, setName] = useState('');
    const input_ref = useRef(null);

    const handleListName = (e) => {
        e.preventDefault();
        // create new List
        const newList = {
            id: new Date().getTime().toString(),
            name,
            toDos: []
        }
        props.dispatch({ type: 'ADD_LIST', payload: newList });

        // for make value of input false
        input_ref.current.classList.toggle('display_none');
        document.querySelector('.add_list_text').classList.toggle('display_none');
        props.input_dos.current.focus();
    }

    const handlePlusClick = (e) => {
        e.preventDefault();
        // for toggle input and text
        setName('');
        document.querySelector('.add_list_text').classList.toggle('display_none');
        input_ref.current.classList.toggle('display_none');
        input_ref.current.focus();
    }

    return (
        <>
            <div className="left_upper">
                <div className="add_list_btn_container">
                    <button className='add_list_btn' onClick={handlePlusClick}>
                        <img className='add_list_img' src={plus_image} alt="Plus" />
                    </button>
                </div>
                <div className="add_list_input_container">
                    <div className='add_list_text'>Add New List</div>
                    <form onSubmit={handleListName}>
                        <input value={name} ref={input_ref} className='add_list_input display_none' type="text" onChange={(e) => setName(e.target.value)} />
                    </form>
                </div>
            </div>
            <div className="left_lower">
                {props.state.list.map(item => {
                    return <div div className="list_container" key={item.id} >
                        <div className="list_name" onClick={() => {
                            props.dispatch({ type: 'ACTIVATE', payload: item.id })
                        }}>
                            {item.name}
                        </div>
                        <div className="remove_list_container">
                            <button
                                onClick={() => props.dispatch({ type: 'REMOVE_LIST', payload: item.id })} className='remove_list_btn'>
                                <img src={delete_image} className="remove_list_img" alt="delete" />
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default LeftLayout;