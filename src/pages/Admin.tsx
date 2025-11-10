import React, { useState, useEffect } from 'react';
import { LogOut, FileText, Calendar, TestTube, BarChart, Eye, Trash2, CheckCircle } from 'lucide-react';
import { clinicConfig } from '../config/clinic';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [diagnostics, setDiagnostics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'prescriptions' || activeTab === 'dashboard') {
        const { data } = await supabase
          .from('prescription_uploads')
          .select('*')
          .order('created_at', { ascending: false });
        setPrescriptions(data || []);
      }
      if (activeTab === 'appointments' || activeTab === 'dashboard') {
        const { data } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false });
        setAppointments(data || []);
      }
      if (activeTab === 'diagnostics' || activeTab === 'dashboard') {
        const { data } = await supabase
          .from('diagnostic_bookings')
          .select('*')
          .order('created_at', { ascending: false });
        setDiagnostics(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidUser = clinicConfig.adminUsers?.some(
      (user) => user.username === credentials.username && user.password === credentials.password
    );

    if (isValidUser) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  const handleUpdateStatus = async (table: string, id: string, status: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete record');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-lavender-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <BarChart className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">{clinicConfig.name}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Change default password after first login
          </p>
        </div>
      </div>
    );
  }

  const todayPrescriptions = prescriptions.filter(
    (p) => new Date(p.created_at).toDateString() === new Date().toDateString()
  );
  const todayAppointments = appointments.filter(
    (a) => a.appointment_date === new Date().toISOString().split('T')[0]
  );
  const pendingActions = [...prescriptions.filter(p => p.status === 'new'), ...appointments.filter(a => a.status === 'confirmed')].length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{clinicConfig.name} - Admin Panel</h1>
              <p className="text-sm text-gray-600">Logged in as: {credentials.username}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart },
            { id: 'prescriptions', label: 'Prescriptions', icon: FileText },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'diagnostics', label: 'Diagnostic Tests', icon: TestTube },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{todayPrescriptions.length}</p>
                <p className="text-sm text-gray-600">New Prescriptions Today</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-lavender-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{todayAppointments.length}</p>
                <p className="text-sm text-gray-600">Appointments Today</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <TestTube className="w-8 h-8 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{pendingActions}</p>
                <p className="text-sm text-gray-600">Pending Actions</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <BarChart className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {prescriptions.length + appointments.length + diagnostics.length}
                </p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[...prescriptions.slice(0, 3), ...appointments.slice(0, 3)]
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .slice(0, 10)
                      .map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {item.booking_id ? 'Appointment' : 'Prescription'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.patient_name}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              item.status === 'new' || item.status === 'confirmed'
                                ? 'bg-blue-100 text-blue-800'
                                : item.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Prescription Uploads</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date/Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Age/Gender</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Question</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {prescriptions.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.patient_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.age}/{item.gender}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.phone}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {item.primary_question || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateStatus('prescription_uploads', item.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete('prescription_uploads', item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Booking ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date/Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-purple-600">{item.booking_id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.patient_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.doctor_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.appointment_date} {item.appointment_time}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 capitalize">{item.appointment_type.replace('_', ' ')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹{item.fee}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateStatus('appointments', item.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete('appointments', item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Diagnostic Test Bookings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Booking ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date/Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Collection</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cost</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {diagnostics.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-purple-600">{item.booking_id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.patient_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.preferred_date} {item.preferred_time}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 capitalize">{item.collection_type}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">₹{item.estimated_cost}</td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateStatus('diagnostic_bookings', item.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete('diagnostic_bookings', item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
