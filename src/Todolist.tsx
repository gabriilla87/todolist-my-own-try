import React, {ChangeEvent, useRef, useState} from 'react';
import {FilterType, TasksType} from "./App";
import {Button} from "./Button";
import './Todolist.styles.css'

type TodolistPropsType = {
    tasks: Array<TasksType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    tasksFilter: (filterName: FilterType) => void
    filterName: FilterType
    tasksStatusChanger: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({tasks, addTask, removeTask, tasksFilter, filterName, tasksStatusChanger}: TodolistPropsType) => {
    let inputRef = useRef<HTMLInputElement>(null);
    let [error, setError] = useState<string | null>(null);

    const onClickAddTaskHandler = () => {
        if (inputRef.current) {
            if (inputRef.current.value.trim() === "") {
                setError('Title is required')
            } else {
                addTask(inputRef.current.value.trim());
                inputRef.current.value = "";
            }
        }
    };
    const onClickRemoveTaskHandler = (taskId: string) => {
        removeTask(taskId)
    };
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') onClickAddTaskHandler();
    };
    const onClickFilterHandler = (filterName: FilterType) => tasksFilter(filterName);
    const activeBtnIndicator = (filterTitle: FilterType) => filterName === filterTitle ? "activeBtn" : ""



    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input ref={inputRef} onKeyDown={onKeyDownHandler} className={error ? 'error' : ''}/>
                <Button title={'+'} onClick={onClickAddTaskHandler}/>
            </div>
            {error && <span className={'errorMsg'}>{error}</span>}
            <ul className={'list'}>
                {tasks.map(t => {
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        tasksStatusChanger(t.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={t.id}>
                            <Button title={"X"} onClick={() => onClickRemoveTaskHandler(t.id)}/>
                            <input type={"checkbox"} checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button title={'all'} className={activeBtnIndicator('all')} onClick={() => onClickFilterHandler('all')}/>
                <Button title={'active'} className={activeBtnIndicator('active')} onClick={() => onClickFilterHandler('active')}/>
                <Button title={'completed'} className={activeBtnIndicator('completed')} onClick={() => onClickFilterHandler('completed')}/>
            </div>
        </div>
    );
};

