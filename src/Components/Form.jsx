import React, { useState, useEffect, useRef } from 'react';
import './Form.css';
import {AiTwotoneEdit} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai';
import {IoSaveSharp} from 'react-icons/io5';

const Form = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([
        {
            text: "Create New Tasks",
            isCompleted: false,
            isEditing: false
        }
    ]);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [isInputEmpty, setInputEmpty] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
        inputRef.current.focus();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const addTodo = text => {
        if (text !== '') {
            const newTodos = [...todos, { text }];
            setNewTodo('');
            setTodos(newTodos);
        } else {
            setInputEmpty(true);
        }
    };

    const removeTodo = inx => {
        const newArr = [...todos];
        newArr.splice(inx, 1);
        setTodos(newArr);
    };

    const completeTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isCompleted = !newTodos[inx].isCompleted;
        setTodos(newTodos);
    };

    const editTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        setTodos(newTodos);
    };

    const saveTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        newTodos[inx].text = noteRef.current[inx].value;
        setTodos(newTodos);
    };

    const clearInput = () => {
        setNewTodo('');
    };

    const setTodo = todo => {
        setInputEmpty(false);
        setNewTodo(todo);
    };

    useEffect(() => {
    }, [todos]);

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form__input">
                <div className="form-control">
                    <label htmlFor="task" className="label">
                        What is needed to be done?
                    </label>
                    <input
                        type="text"
                        id="task"
                        value={newTodo}
                        placeholder={
                            isInputEmpty ? "Task can't be empty" : "Enter your task"
                          }
                        onChange={e => setTodo(e.target.value)}
                        onFocus={clearInput}
                        ref={inputRef}
                        //onKeyPress={preventSubmit}
                    />
                </div>
                <button
                    type="submit"
                    className="button"
                    //onKeyPress={preventSubmit}
                >
                    +
                </button>
            </div>
            <div className="list">
                {todos.map((todo, inx) => (
                    <div key={`todo-${inx}`} className="list-item">
                        <input
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => completeTodo(inx)}
                        />
                        {!todo.isEditing ? (
                            <div
                                className={`list-item-text ${todo.isCompleted ? 'completed' : ''}`}
                            >
                                {todo.text}
                            </div>
                        ) : (
                            <div className="list-item-edit">
                                <label htmlFor={`task-${inx}`} className="visuallyhidden">
                                    {todo.text}
                                </label>
                                <input
                                    type="textt"
                                    className="form__edit-input"
                                    defaultValue={todo.text}
                                    ref={element => (noteRef.current[inx] = element)}
                                    //onKeyPress={preventSubmit}
                                    id={`task-${inx}`}
                                    autofocus
                                />
                                <button className='saveButton' onClick={() => saveTodo(inx)} aria-label="save">
                                    <IoSaveSharp/>
                                </button>
                            </div>
                        )}
                        <button className='editButton' onClick={() => editTodo(inx)} aria-label="edit">
                            <AiTwotoneEdit />
                        </button>
                        <button className='deleteButton' onClick={() => removeTodo(inx)} aria-label="delete">
                            <AiFillDelete />
                        </button>
                    </div>
                ))}
            </div>
        </form>
    );
};

export default Form;
