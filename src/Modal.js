import { useState } from 'react';
import './Modal.css';

function Modal({ handleClick, isNewTask, isComplete, heading, id }) {
  return (
    <>
      <div className="darkBG" />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{heading}</h5>
          </div>
          <div className="confirmation-wrapper">
            {isComplete && <div className="overall-wrapper">
              <p>Are you sure you want to mark this task as completed?</p>
              <div className="button-wrapper-modal"><button onClick={event => handleClick({ type: "completedYes" })}>Yes</button>
                <button onClick={event => handleClick({ type: "completedNo" })}>No</button></div>
            </div>}
            {
              isNewTask && <div className="task-new">
                <input type="text" id="text_value" />
                <div className="button-wrapper-modal"><button onClick={event => handleClick({ type: "addNewTask", value: document.getElementById('text_value').value })}>Add</button>
                  <button onClick={event => handleClick({ type: "cancelNewTask" })}>Cancel</button></div>

              </div>
            }
          </div>
        </div>
      </div></>
  );
}

export default Modal;