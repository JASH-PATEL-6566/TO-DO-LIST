const reducerForList = (state, action) => {
    if (action.type === 'ADD_LIST') {
        const setOfList = [...state.list, action.payload];
        console.log(setOfList);
        return {
            ...state,
            active: action.payload.id,
            list: setOfList
        }
    }
    else if (action.type === 'REMOVE_LIST') {
        const newList = state.list.filter(item => item.id !== action.payload)
        return {
            ...state,
            list: newList
        }
    }
    else if (action.type === 'ACTIVATE') {
        return {
            ...state,
            active: action.payload
        };
    }
    else if (action.type === 'ADD_DO') {
        const activeToDo = action.payload
        // console.log(activeToDo);
        let ans;
        const final = state.list.map(item => {
            if (item.id === state.active) {
                const { toDos } = item
                const finalTodos = [...toDos, activeToDo]
                ans = { ...item, toDos: finalTodos }
            }
            return ans;
        })

        return { ...state, list: final };
    }
    else if (action.type === 'REMOVE_TODO') {
        const [listId, todoId] = action.payload
        // console.log(activeToDo);
        let ans;
        const final = state.list.map(item => {
            if (item.id === listId) {
                const { toDos } = item
                const finalTodos = toDos.filter(item => item.id !== todoId)
                ans = { ...item, toDos: finalTodos }
            }
            return ans;
        })

        return { ...state, list: final };
    }
    else {
        throw new Error('No action found..')
    }


}

export default reducerForList;