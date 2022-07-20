import React, { useEffect, useState } from 'react'
import add from '../../Images/plus.png'
import remove from '../../Images/delete.png'


const RightLayout = (props) => {
    const [dos, setDos] = useState('');

    const handleSubmitDos = (e) => {
        e.preventDefault();

        const newDo = {
            id: new Date().getTime().toString(),
            dos,
        }

        props.dispatch({ type: 'ADD_DO', payload: newDo })

    }

    const DoElement = () => {
        return (
            props.state.active && props.state.list.map(item => {
                return (
                    (props.state.active === item.id && item.toDos) && item.toDos.map(dos => {
                        return (
                            <div className="dos_container" key={dos.id}>
                                <div className="dos_name">
                                    {dos.name}
                                </div>
                                <div className="remove_dos_container">
                                    <button className='remove_dos_btn' onClick={() => {
                                        props.dispatch({ type: 'REMOVE_TODO', payload: [item.id, dos.id] })
                                    }}>
                                        <img className='remove_dos_img' src={remove} alt="remove" />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )
            }
            ))
    }

    return (
        <>
            <div className="add_dos_container">
                <div className="add_dos_input">
                    <form onSubmit={handleSubmitDos}>
                        <input type="text" value={dos} className='dos_input' onChange={(e) => setDos(e.target.value)} />
                    </form>
                </div>
                <div className="add_dos_btn_container">
                    <button type='submit' onSubmit={handleSubmitDos} className="add_dos_btn">
                        <img className="add_dos_btn_img" src={add} alt="add" />
                    </button>
                </div>

            </div>

            <DoElement />

        </>
    )
}

export default RightLayout;