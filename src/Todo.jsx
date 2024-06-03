import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";//DELETE
import { FaRegEdit } from "react-icons/fa";//EDIT

import "./Todo.css"; 

const Todo = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setRecord(data);
  }, []);


//-------------------------- TO ADD A NEW RECORD ---------------------------------
const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !contact) {
      alert("PLEASE FILL ALL THE FIELDS.....!!");
      return;
    }

    const obj = {
      id: Date.now(),
      name,
      contact,
    };

    const updatedRecord = [...record, obj];
    localStorage.setItem("users", JSON.stringify(updatedRecord));
    setRecord(updatedRecord);
    setName("");
    setContact("");
    alert("RECORD ADDED SUCCESSFULLY.....!!!");
  };


  //------------------------- TO DELETE A RECORD --------------------------
  const deleteUser = (id) => {
    const updatedRecord = record.filter((val) => val.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedRecord));
    setRecord(updatedRecord);
    alert("RECORD DELETED SUCCESSFULLY......!!!");
  };


//----------------------- TO EDIT A RECORD -----------------------------
  const editUser = (id) => {
    const userToEdit = record.find((val) => val.id === id);
    setName(userToEdit.name);
    setContact(userToEdit.contact);
  };

  return (

    <div className="todo-container">
      <h1 className="todo-heading">TODO LIST</h1>
      <div className="add-form-container">
        <h3>Add Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
      </div>
      <div className="view-tasks-container">
        <h3>View Tasks</h3>
        <table className="task-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            record.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.contact}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(item.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => editUser(item.id)}
                  >
                    <FaRegEdit />
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
