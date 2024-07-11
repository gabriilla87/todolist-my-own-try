import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);
    let [filterName, setFilterName] = useState<FilterType>('all');

    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    };
    const removeTask = (taskId: string) => {
        tasks = tasks.filter(t => taskId !== t.id)
        setTasks([...tasks])
    };
    const tasksFilter = (filterName: FilterType) => {
        setFilterName(filterName);
    };
    const taskStatusChanger = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);
        if (task) task.isDone = isDone;
        setTasks([...tasks])
    }

    let filteredTasks = tasks;
    if (filterName === 'active') filteredTasks = tasks.filter(t => !t.isDone);
    if (filterName === 'completed') filteredTasks = tasks.filter(t => t.isDone);

    return (
        <div className="App">
            <Todolist tasks={filteredTasks}
                      addTask={addTask}
                      removeTask={removeTask}
                      tasksFilter={tasksFilter}
                      filterName={filterName}
                      tasksStatusChanger={taskStatusChanger}
            />

        </div>
    );
}

export default App;
