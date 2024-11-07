import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users
  useEffect(() => {
    axios.get("http://localhost:8050/api/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Create a new user
  const addUser = () => {
    axios.post("http://localhost:8050/api/create", { name, email, age })
      .then(response => {
        setUsers([...users, { name, email, age }]);~
        setName("");
        setEmail("");
        setAge("");
      })
      .catch(error => console.error(error));
  };

  // Delete user
  const deleteUser = id => {
    axios.delete(`http://localhost:8050/api/delete/${id}`)
      .then(response => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error(error));
  };

  // Edit user
  const editUser = id => {
    const user = users.find(user => user.id === id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
    setEditingUser(id);
  };

  // Update user
  const updateUser = () => {
    axios.put(`http://localhost:8050/api/update/${editingUser}`, { name, email, age })
      .then(response => {
        setUsers(users.map(user => user.id === editingUser ? { id: editingUser, name, email, age } : user));
        setName("");
        setEmail("");
        setAge("");
        setEditingUser(null);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="crud">
      <h3>CRUD APP</h3>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
      <button className="btn btn-success ms-2" onClick={editingUser ? updateUser : addUser}>
        {editingUser ? "Update User" : "Add User"}
      </button>

      <table>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
              <button className="btn btn-warning" onClick={() => editUser(user.id)}>Edit</button>
              <button className="btn btn-danger ms-3" onClick={() => deleteUser(user.id)}>Delete</button>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default App;
