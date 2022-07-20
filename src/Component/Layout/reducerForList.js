import { list } from "postcss";

const reducerForList = (state, action) => {
    if (action.type === 'ADD_LIST') {
        const setOfList = [...state.list, action.payload];
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
        const unActive = state.list.filter(item => item.id !== state.active);
        const activeList = state.list.filter(item => item.id === state.active);
        console.log({ activeList })
        const activeToDo = [action.payload]
        console.log(activeToDo)
        const final = { toDos: activeToDo }
        console.log({ final })
        console.log({ unActive })
        return {
            active: activeList.id,
            list: [...unActive, final]
        }
    }
    else if (action.type === 'REMOVE_TODO') {
        let activeList = state.list.filter(item => item.id === action.payload[0]);
        let unActiveList = state.list.filter(item => item.id !== action.payload[0]);
        let todo = [activeList.toDos];
        const final = todo.filter(item => item.id !== action.payload[1])
        todo = [...final];
        activeList = { ...activeList, toDos: todo }
        return {
            ...state,
            list: [...unActiveList, activeList]
        }
    }
    else {
        throw new Error('No action found..')
    }


}

export default reducerForList;