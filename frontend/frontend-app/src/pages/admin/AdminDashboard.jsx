import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import './Admin.css';

export default function AdminDashboard() {
  return (
    <div className="doc-dashboard animate-fade-in">
      <AdminSidebar />
      <Outlet />
    </div>
  )
}
