import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ContactsPage from './pages/ContactsPage';
import { ContactProvider } from './contexts/ContactContext';
import { DealProvider } from './contexts/DealContext';
import { TaskProvider } from './contexts/TaskContext';

import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <ContactProvider>
      <DealProvider>
        <TaskProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="deals" element={<DealsPage />} />
                <Route path="tasks" element={<TasksPage />} />
              </Route>
            </Routes>
          </Router>
        </TaskProvider>
      </DealProvider>
    </ContactProvider>
  );
}

export default App;
