import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import useNavigate
import Register from './Component/registration/registration';
import Login from './Component/login/login';
import Dashboard from './Component/Dashboard/dashboard';
import NavBar from './Component/Navigation/NavBar';
import { useAuth } from './Contexts/AuthContext';
import Team from './Component/Team/team';
import Task from './Component/Task/task';
import NavigateTo from './Component/Navigate/navigate';
import Profile from './Component/Profile/profile';
import TeamInfo from './Component/Team/teamInfo';

function App() {
  const { user } = useAuth();
  console.log(user)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard />
            ) : (

              <NavigateTo to='/login' />
            )
          }
        />
        <Route
          path="/teaminfo"
          element={
            user ? (
              <TeamInfo />
            ) : (

              <NavigateTo to='/login' />
            )
          }
        />
        <Route path="/team" element={
          user ? (
              <Team />
            ) : (

              <NavigateTo to='/login' />
            )} />
        <Route path="/task" element={user ? (
              <Task />
            ) : (
              <NavigateTo to='/login' />
            )} />
        <Route path="/profile" element={user ? (
              <Profile />
            ) : (

              <NavigateTo to='/login' />
            )} />
      </Routes>
    </>
  );
}

export default App;
