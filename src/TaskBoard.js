import './TaskBoard.css';
import { FaTasks } from "react-icons/fa";
import TaskData from './TaskData.js';
import Tab from './Tab.js';
import { useState } from 'react';
import React from 'react';

export const Context = React.createContext({ date: null, setDate: () => {} });
function TaskBoard() {
  const [date, setDate] = useState((new Date()).getTime());
  return (
    <div className="main">
      <Context.Provider value={{date, setDate}}>
      <div className="task-board-wrapper">
        <div className="board-main">
          <header>TASK MANAGER</header>
          <FaTasks />
        </div>
        <div className="board-tab">
         <Tab />
        </div>
      </div>
      <TaskData />
      </Context.Provider>
    </div>
  );
}

export default TaskBoard;