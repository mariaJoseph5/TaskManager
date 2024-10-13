import './TaskData.css';
import { useContext, useState, useEffect } from 'react';
import { Context } from './TaskBoard';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import Modal from './Modal';
import { MdOutlineDoneOutline } from "react-icons/md";
import { FiDatabase } from "react-icons/fi";

function TaskData() {
  const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const { date } = useContext(Context);
  var dateValue = new Date(date);
  const [lengthValue, setLengthValue] = useState(0);
  const [idValue, setIdValue] = useState();
  const [listItems, setListItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isYesterday, setIsYesterday] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:4000/items").then((res) => {
      if (res.data.length !== 0) {
        setLengthValue(res.data.length);
        const timeFactor = (new Date(`${dateValue.getMonth() + 1}/${dateValue.getDate()}/${dateValue.getFullYear()}`)).getTime() / 1000;
        res = res.data.filter((item) => ((item.date - timeFactor <= 60 * 60 * 24) && (item.date >= timeFactor)));
        setListItems(res);
        var todayDate = new Date();
        setIsYesterday(timeFactor < (new Date(`${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`)).getTime()/1000);
      }
    });
  }, [date]);
  function removeTask(id) {
    setIdValue(id);
    setShowAlert(true);
  }
  function addTask() {
    setShowModal(true);
  }
  const handleClick = value => {
    switch (value.type) {
      case "completedYes": {
        var item = listItems.filter((item) => item.id == idValue)[0];
        setListItems(...listItems, {
          ...item,
          "completed": true
        });
        axios.put(`http://localhost:4000/items/${idValue}`, { ...item, "completed": true }).then((res) => {
          setShowAlert(false);
          setListItems([...listItems, res.data]);
        });
      }
        break;
      case "completedNo":
        setShowAlert(false);
        break;
      case "addNewTask": {
        axios.post("http://localhost:4000/items", {
          "id": lengthValue,
          "date": dateValue.getTime() / 1000,
          "completed": false,
          "task": value.value
        }).then((res) => {
          setShowModal(false);
        });
      }
        break;
      case "cancelNewTask":
        setShowModal(false);
        break;
    }
  }

  return (
    <>{
      showModal && <Modal handleClick={handleClick} isComplete={false} isNewTask={true} heading="New Task" />
    }{
        showAlert && <Modal handleClick={handleClick} isComplete={true} isNewTask={false} heading="Confirmation" />
      }
      <div className="main-data">
        <div> <p>{dateValue.getDate()}<sup>th</sup>&nbsp;{monthList[dateValue.getMonth()]}, {dayList[dateValue.getDay()]}</p></div>
        <div className="card-wrapper">
          {
            listItems.length > 0 && listItems.map((item) =>
              <div key={item.id} className={`card-item ${item.completed ? "active" : ""}`}>
                <p> {item.task}</p>
                <button id={item.id} className={`small-button ${item.completed ? "no-show" : ""}`} onClick={() => removeTask(item.id)}>Mark as Complete &nbsp;<MdOutlineDoneOutline /></button>
              </div>
            )
          } {
            listItems.length == 0 && <div className="no-data-container">
              <p>NO TASKS</p>
              <FiDatabase size={150} className="size-icon"/>
            </div>
          }
        </div>
        <div className="add-button">{
          !isYesterday &&
          <div className="button-wrapper">
            <button onClick={() => addTask()}><p className="button-data">Add Task</p></button>
            <FaPlus />
          </div>
        }
        </div>
      </div>
    </>
  );
}

export default TaskData;