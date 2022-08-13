import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

//como va lucir nuestro estado inicial
// const initialState = [
//     // {
//     //     id: new Date().getTime(),
//     //     description: 'Recolectar la piedra del alma',
//     //     done: false
//     // }
// ];
const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || [] ;
}

export const useTodo = () => {
    const [ todos, dispatch ] = useReducer( todoReducer, [] , init);

    //Ejecutar algo cuando todos cambian
    useEffect(() => {
      
        //Guardar en el localStorage
        localStorage.setItem('todos', JSON.stringify( todos ) );

    }, [ todos ]);
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        //se usa el dispatch para mandar la action al Reducer
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        console.log({ id });
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    return {
        todos,
        todoCount: todos.length,
        pendingTodoCount: todos.filter( todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}
