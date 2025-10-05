"use client";
import { useEffect, useState, useMemo } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import api from "@/utils/api";
import { usePortfolio } from "@/context/portfolioContext";
import { FaChartLine, FaClock, FaEdit, FaExternalLinkAlt, FaEye, FaPalette } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { MdQuickreply, MdVerified } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useAuth } from "@/context/authContext";

// Register Chart.js components once
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MetricCard = ({ icon: IconComponent, title, value, colorClass, duration = 1.2, isDate = false }) => (
  <Card className={`overflow-hidden shadow-lg border-t-4 ${colorClass.border} transition-all duration-300 hover:shadow-xl`}>
    <CardContent className="p-6 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-4">
        <IconComponent className={`text-3xl ${colorClass.icon} p-1 rounded-md`} />
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h2>
      </div>

      <p className="text-4xl font-extrabold text-gray-900 leading-none">
        {isDate ? (
          <span className="text-xl font-semibold text-gray-700">
            {value ? new Date(value).toLocaleString() : "N/A"}
          </span>
        ) : (
          // Using CountUp Mock/Static Display
          <CountUp end={value ?? 0} duration={duration} separator="," />
        )}
      </p>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { portfolio } = usePortfolio();
  const {user}=useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch analytics data dynamically
  useEffect(() => {
    if (!portfolio?._id) return;
  

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      // Exponential backoff retry logic for API call
      const maxRetries = 1;
      let attempts = 0;

      while (attempts < maxRetries) {
        try {
          // Using fetch API directly to avoid dependency on an external 'api' utility
          const response = await api.get(`/analytics/views/${portfolio?._id}`);
          console.log('respnose',response);
          if (!response.status || response.status >= 400) {
            const errorData = response;
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }



         
          setAnalytics(response.data.analytics);
          setLoading(false);
          return; // Exit on success

        } catch (err) {
          console.error(`Attempt ${attempts + 1} failed:`, err.message);
          if (attempts === maxRetries - 1) {
            setError(`Failed to fetch analytics after ${maxRetries} attempts.`);
            setLoading(false);
          }
          attempts++;
          // Wait with exponential backoff before retrying
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
        }
      }
    };

    fetchAnalytics();
  }, [portfolio?._id]);

  // Memoize chart data based on the fetched history
  const chartData = useMemo(() => {
    if (!analytics) return { labels: [], datasets: [] };

    // 1. Prepare data points: Use the last 6 historical days + today's count
    // Sort history by date if necessary (though the controller 'shift's, keeping it sorted)
    const history = analytics.viewsHistory || [];

    // Combine history and current day's data
    const dataPoints = [...history];

    // Add today's data (must ensure the date is accurate for 'today')
    // Only push if the current day's views haven't been archived yet (which is true while dailyViews > 0)
    const todayDate = new Date().toISOString().split('T')[0];

    // Check if today's data is already the last item in history (shouldn't be, but a safeguard)
    const lastDate = history.length > 0 ? history[history.length - 1].date : null;

    if (analytics.dailyViews > 0 && lastDate !== todayDate) {
      dataPoints.push({
        date: todayDate,
        views: analytics.dailyViews
      });
    }

    // Limit the displayed points to the last 7 days for the chart
    const chartDataPoints = dataPoints.slice(-7);

    // 2. Extract labels (dates) and data (views)
    const labels = chartDataPoints.map(point => {
      const dateStr = point.date;
      const date = new Date(dateStr);
      if (dateStr === todayDate) return "Today";
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const data = chartDataPoints.map(point => point.views);

    return {
      labels,
      datasets: [
        {
          label: "Daily Views",
          data,
          fill: true,
          backgroundColor: "rgba(79, 70, 229, 0.1)", // Light indigo fill
          borderColor: "#4F46E5", // Primary indigo line
          borderWidth: 2,
          tension: 0.4, // Smooth curve
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: '#4F46E5',
        },
      ],
    };
  }, [analytics]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
      },
      title: { display: true, text: "Last 7 Days View Trend", color: "#111827", font: { size: 18, weight: '600' } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6B7280" } },
      y: { beginAtZero: true, ticks: { color: "#6B7280" }, grid: { color: "#E5E7EB" } },
    },
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto p-6 lg:p-10 bg-gray-50 min-h-screen">

      {/* Header and Status */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 border-gray-200">
        <div className="flex items-center gap-3">
          <FaChartLine className="text-4xl text-indigo-600" />
          <h1 className="text-4xl font-extrabold text-gray-900">
            Portfolio Dashboard
          </h1>
        </div>

        {/* Live Status and URL */}
        <Card className="p-3 bg-white shadow-md border-green-200 border">
          <div className="flex items-center gap-3">
            <MdVerified className="text-xl text-green-500" />
            <span className="text-sm font-medium text-gray-700">
              Status: <span className="font-bold text-green-700">Live</span>
            </span>

            <a
              href={`/users/${user?.userName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors font-medium flex items-center gap-1"
            >
              View Live ({`${user?.userName}` || 'N/A'})
              <FaExternalLinkAlt className="text-xs ml-1" />
            </a>
          </div>
        </Card>
      </header>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Top Analytics Cards */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-28 animate-pulse bg-gray-200 shadow-md"></Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard
            icon={FaEye}
            title="Today's Views"
            value={analytics?.dailyViews}
            colorClass={{ border: "border-indigo-500", icon: "text-indigo-600 bg-indigo-50" }}
            duration={1.2}
          />

          <MetricCard
            icon={FaChartLine}
            title="Total Lifetime Views"
            value={analytics?.totalViews}
            colorClass={{ border: "border-green-500", icon: "text-green-600 bg-green-50" }}
            duration={1.5}
          />

          <MetricCard
            icon={FaClock}
            title="Data Last Refreshed"
            value={analytics?.updatedAt}
            colorClass={{ border: "border-gray-300", icon: "text-gray-600 bg-gray-100" }}
            isDate={true}
          />
        </div>
      )}

      {/* Charts Section */}
      <div className="grid lg:grid-cols-1 gap-6">
        <Card className="shadow-2xl border border-gray-100">
          <CardContent className="p-6 h-[400px]">
            {loading ? (
              <div className="h-full flex items-center justify-center text-gray-500">Loading chart data...</div>
            ) : (
              <Line data={chartData} options={chartOptions} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <MdQuickreply className="text-indigo-600 h-6 w-6" /> Immediate Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Button
            as={Link}
            to={`/edit-portfolio/${portfolio?._id}`}
            className="flex items-center gap-2 px-6 py-3 shadow-md bg-indigo-600 hover:bg-indigo-700 text-white transition-transform transform hover:scale-[1.01]"
          >
            <FaEdit /> Edit Portfolio Content
          </Button>

          <Button
            as={Link}
            to={`/theme-settings`}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 border-purple-500 text-purple-700 hover:bg-purple-50 transition-transform transform hover:scale-[1.01]"
          >
            <FaPalette /> Customize Design/Theme
          </Button>

          <Button
            as={Link}
            to={`/${portfolio?.userName}`}
            variant="secondary"
            className="flex items-center gap-2 px-6 py-3 shadow-md bg-green-600 hover:bg-green-700 text-white transition-transform transform hover:scale-[1.01]"
          >
            <FaExternalLinkAlt /> Share/View Live Site
          </Button>
        </div>
      </div>
    </div>
  );
}
