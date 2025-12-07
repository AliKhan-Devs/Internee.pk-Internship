import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FiUsers,
  FiEye,
  FiSearch,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import api from "@/utils/api";
import HomeNav from "@/components/layouts/HomeNav";
import HomeFooter from "@/components/layouts/HomeFooter";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortByViews, setSortByViews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/users/all-users?page=${pageNum}&limit=8`);
      const data = res.data.users.map((u) => u.user);
      setUsers(data);
      setFiltered(data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Handle search and sorting
  useEffect(() => {
    let data = [...users];
    if (search.trim() !== "") {
      data = data.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.userName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortByViews) {
      data.sort((a, b) => b.totalViews - a.totalViews);
    }
    setFiltered(data);
  }, [search, sortByViews, users]);

  // Avatar gradient colors
  const avatarColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-400 to-lime-500",
    "from-yellow-400 to-orange-500",
    "from-red-400 to-pink-600",
  ];
  const getRandomColor = (index) => avatarColors[index % avatarColors.length];

  return (
    <>
      <HomeNav />
      <div className="max-w-7xl mx-auto mt-16 p-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FiUsers className="text-blue-600" /> PortaBuild Users
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-60"
              />
            </div>
            <Button
              variant={sortByViews ? "default" : "outline"}
              onClick={() => setSortByViews(!sortByViews)}
            >
              Sort by Views
            </Button>
          </div>
        </div>

        {/* Users Grid */}
        {loading ? (
          <p className="text-gray-500 text-center mt-10">Loading users...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No users found.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((user, i) => (
                <Card
                  key={i}
                  className="group flex flex-col hover:shadow-lg hover:scale-[1.02] transition-all border border-gray-200 hover:border-blue-500 bg-white"
                >
                  <CardContent className="flex flex-col h-full p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-br ${getRandomColor(
                            i
                          )}`}
                        >
                          {user.name[0].toUpperCase()}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                          <p className="text-sm text-gray-500">@{user.userName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <FiEye />
                        <span className="text-sm font-medium">{user.totalViews}</span>
                      </div>
                    </div>

                    {/* Email */}
                    <p className="text-gray-500 text-sm truncate">{user.email}</p>

                    {/* Push Button to Bottom */}
                    <div className="mt-auto pt-4">
                      <Button
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all"
                        onClick={() =>
                          window.open(`/users/${user.userName}`, "_blank")
                        }
                      >
                        <FiExternalLink /> View Portfolio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1"
              >
                <FiChevronLeft /> Prev
              </Button>
              <span className="text-gray-600">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1"
              >
                Next <FiChevronRight />
              </Button>
            </div>
          </>
        )}
      </div>
      <HomeFooter />
    </>
  );
}
