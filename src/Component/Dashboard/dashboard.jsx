import React from 'react';
import TaskTray from '../Task/taskTray';

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className=" bg-[#3f6769] py-4">
        <div className="container mx-auto text-white">
          <h1 className="text-3xl font-semibold text-center">Welcome to the Dashboard</h1>
          <p className='text-center'>This is your dashboard where you can view and manage your tasks</p>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
          <TaskTray />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
