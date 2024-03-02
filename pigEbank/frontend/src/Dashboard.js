import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { Empty } from 'antd';


function Dashboard() {
  const [numberOfGoals, setNumberOfGoals] = useState(0);

  useEffect(() => {
    // Get username from cookie
    const username = document.cookie.split('; ').find(row => row.startsWith('username=')).split('=')[1];
    const email = document.cookie.split('; ').find(row => row.startsWith('email=')).split('=')[1];
    axios.get('/accounts')
      .then(response => {
        // Find user by username
        const user = response.data.find(user => user.email === email);
        if (user) {
          setNumberOfGoals(user.numOfGoals);

          axios.get('/accounts/getGoals/'+email)
          .then(res => {
            const goalsID = user.goalsID;
            // console.log(res.data[1].id);
            
            //Might need to make a for loop to get each goal
            //Prints out the goalIds into the terminal :D  -- Delete later
            for(let i = 0; i < numberOfGoals; i++) {
              console.log("at " + i + ":")
              console.log(res.data[i].id);
            }
            
          })
          .catch(err => console.log(err));
        }

      })
      .catch(error => {
        console.error('Error fetching number of goals:', error);
      });
  }, []); 

  const logout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Pig E-Bank</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/Profile">Profile</a>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logout}>Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className='background2'>
      <div className="grid-container">
        {[...Array(Math.max(numberOfGoals, 12))].map((_, index) => (
          <div className="grid-item" key={index}>
            <div className="content">
              {index < numberOfGoals ? (
                <Link to={`/PigInfo/Pig${index + 1}`}>
                  <img src={`images/favicon.ico`} alt={`Pig ${index + 1}`} />
                  {<div className="overlay">Visit</div>}
                </Link>
              ) : index === numberOfGoals ? (
                <Link to={`/createNewGoal`}>
                  <img src="images/testPlus.jpg" alt={`Pig ${index + 1}`} />
                </Link>
              ) : (
                <img src="images/cobweb.jpg" alt={`Pig ${index + 1}`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}

export default Dashboard;