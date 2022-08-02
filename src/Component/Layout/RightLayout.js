import React, { useEffect, useState } from 'react'
import add from '../../Images/plus.png'
import remove from '../../Images/delete.png'


const RightLayout = (props) => {
    const [dos, setDos] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (props.state.list.length === 0) {
            setName('')
        }
        if (props.state.active) {
            props.state.list.map(item => {
                if (item.id === props.state.active) {
                    setName(item.name)
                }
                return item;
            })
        }
    }, [props.state.active, props.state.list])

    const handleSubmitDos = (e) => {
        e.preventDefault();

        const newDo = {
            id: new Date().getTime().toString(),
            name: dos,
        }

        props.dispatch({ type: 'ADD_DO', payload: newDo })
        setDos('');
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
        props.state.list.length ? <>
            <div className="add_dos_container">
                <div className="add_dos_input">
                    <form onSubmit={handleSubmitDos}>
                        <input type="text" value={dos} ref={props.input_dos} className='dos_input' onChange={(e) => setDos(e.target.value)} />
                    </form>
                </div>
                <div className="add_dos_btn_container">
                    <button type='submit' onClick={handleSubmitDos} className="add_dos_btn">
                        <img className="add_dos_btn_img" src={add} alt="add" />
                    </button>
                </div>

            </div>
            <div className="main_dos_container">
                <DoElement />
            </div>

            <div className="add_dos_inner_container">
                <h2 className='add_dos_inner_text'>{name}</h2>
            </div>
        </> :
            <>
                <div className="inner-container">
                    <h1>No List is select yet</h1>
                </div>
            </>
    )
}

export default RightLayout;