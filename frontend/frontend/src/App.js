import React, { useState } from 'react';
import './App.css';

function App() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5005/api/${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        if (endpoint === '/departments') {
          setDepartments(data);
        } else if (endpoint === '/employees') {
          setEmployees(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="App">
      <header>
        <h1>First React App with MongoDB Backend</h1>
      </header>
      <section>
      <div className='dept'>
        <h2>Departments</h2>
        <button onClick={() => fetchData('/departments')}>Get Departments</button>
        <ul>
          {departments.map((department) => (
            <li key={department._id}>
            Name: {department.name}, Location: {department.location}
          </li>
          ))}
        </ul>
      </div>

      <div className='empl'>
        <h2>Employees</h2>
        <button onClick={() => fetchData('/employees')}>Get Employees</button>
        <ul className='employee-list'>
          {employees.map((employee) => (
             <li key={employee._id}> 
             Name: {employee.name}<br /> 
             ID: {employee._id} <br/>
             Email: {employee.email}<br />
             Salary: {employee.salary}<br />
             Hire Date: {employee.hireDate}
           </li>
          ))}
        </ul>
      </div>
      </section>
    </div>
  );
}

export default App;
