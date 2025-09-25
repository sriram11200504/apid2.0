import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface UserProfile {
  id: string;
  name: string;
  year: string;
  department: string;
  gender: string;
  hostel: string;
}

interface Assessment {
  date: string;
  stress: number;
  anxiety: number;
  depression: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const {user } = useAuthStore();

  useEffect(() => {
    // Mock user profile (replace with DB later)
    setProfile({
      id: "u123",
      name: "Krithika",
      year: "2nd Year",
      department: "Computer Science",
      gender: "Female",
      hostel: "A-Block",
    });

    // Mock past assessments
    setAssessments([
      { date: "2025-01-10", stress: 20, anxiety: 15, depression: 10 },
      { date: "2025-02-05", stress: 35, anxiety: 25, depression: 15 },
      { date: "2025-03-12", stress: 40, anxiety: 30, depression: 20 },
      { date: "2025-04-02", stress: 30, anxiety: 20, depression: 15 },
    ]);
  }, []);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-10">
        <div className="flex justify-between">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Logout</button>
      </div>

      {/* 📌 Basic Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p><span className="font-medium">Name:</span> {profile.name}</p>
          <p><span className="font-medium">Year:</span> {profile.year}</p>
          <p><span className="font-medium">Department:</span> {profile.department}</p>
          <p><span className="font-medium">Gender:</span> {profile.gender}</p>
          <p><span className="font-medium">Hostel:</span> {profile.hostel}</p>
        </div>
      </div>

      {/* 📊 Mental Health Trends */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">My Assessments</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={assessments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="stress" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="anxiety" stroke="#dc2626" strokeWidth={2} />
            <Line type="monotone" dataKey="depression" stroke="#9333ea" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <Link to="/questionnaire">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Take assessment now</button>
        </Link>
      </div>

      {/* 📚 Resources & Actions */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
            <Link to="/booking">
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Book a Counsellor
          </span>
          </Link>
          <Link to="/resources">
          <span className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Relaxation Resources
          </span>
          </Link>
          <Link to="/support">
          <span className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Community
          </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
