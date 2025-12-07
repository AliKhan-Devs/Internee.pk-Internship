"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FiUser, FiSettings, FiBarChart2, FiMonitor, FiSmartphone, FiLayers, FiCode, FiUsers } from "react-icons/fi"
import { Users } from "lucide-react"
import { FaPaintBrush, FaRocket } from "react-icons/fa"
import api from "@/utils/api"
import HomeNav from "@/components/layouts/HomeNav"
import HomeFooter from "@/components/layouts/HomeFooter"

export default function Overview() {
  const [topUsers, setTopUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTopUsers = async () => {
    try {
      const res = await api.get("/users/all-users?page=1&limit=8")
      const users = res.data.users.map((u) => u.user)
      const sorted = users.sort((a, b) => b.totalViews - a.totalViews)
      setTopUsers(sorted.slice(0, 3))
    } catch (err) {
      console.error("Error fetching top users:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTopUsers()
  }, [])

  return (
    <>
      <HomeNav />
      <div className="pt-10 md:pt-16 w-full min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
        {/* Hero Section */}
        <section className="text-center py-20 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold mb-4"
          >
            The Ultimate Portfolio Builder for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Developers, Designers & Creators
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 mb-8"
          >
            PortaBuild helps you create a professional, customizable portfolio with zero coding — built to grow with you.
          </motion.p>
          <div className="flex justify-center gap-4">
            <Button asChild><a href="/register">Get Started</a></Button>
            <Button asChild variant="outline"><a href="/features">View Features</a></Button>
          </div>
        </section>

        {/* What is PortaBuild */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">What is PortaBuild?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            PortaBuild is a platform designed to make portfolio creation effortless. Whether you’re a developer,
            designer, or freelancer — it gives you all the tools to manage, customize, and track your professional
            portfolio in one place.
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            With built-in analytics, responsive themes, and easy editing tools, you can focus on your craft while
            PortaBuild takes care of the presentation.
          </p>
        </section>

        {/* How PortaBuild Works */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-10">How PortaBuild Works</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto px-6">
            {[
              { icon: <FiUser />, title: "Sign Up & Auto Portfolio", desc: "Create your account and get an instant live portfolio." },
              { icon: <FiSettings />, title: "Customize Dashboard", desc: "Edit content, upload images, and change themes visually." },
              { icon: <FaRocket />, title: "Go Live Instantly", desc: "Share your personal URL like portabuild.com/users/username." },
            ].map((item, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition">
                <CardContent className="py-10 space-y-3 flex flex-col items-center">
                  <div className="text-4xl text-blue-600">{item.icon}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose PortaBuild */}
        <section className="py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose PortaBuild</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FiBarChart2 />, title: "Analytics Dashboard", desc: "Track daily, weekly & lifetime views." },
              { icon: <FiLayers />, title: "Complete Customization", desc: "Manage every portfolio section easily." },
              { icon: <FiSmartphone />, title: "Responsive Everywhere", desc: "Optimized for both desktop and mobile." },
              { icon: <FiMonitor />, title: "Theme Switcher", desc: "Change your portfolio’s look in one click." },
              { icon: <FiCode />, title: "Developer-Focused", desc: "Built with Next.js, MongoDB & Tailwind CSS." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="py-8 flex flex-col items-center text-center space-y-2">
                  <div className="text-3xl text-blue-600">{item.icon}</div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Portfolios Showcase */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 text-center">
          <h2 className="text-3xl font-bold mb-10">Live Portfolios Showcase</h2>
          {loading ? (
            <p className="text-gray-500">Loading top portfolios...</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6">
              {topUsers.map((user, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition">
                  <CardContent className="p-0">
                    <div className="p-4 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        {user.name[0].toUpperCase()}
                      </div>
                      <h3 className="font-semibold text-lg mt-3">{user.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><Users size={14} /> {user.totalViews} views</p>
                      <Button asChild size="sm" className="mt-3"><a href={`/users/${user.userName}`}>View Portfolio</a></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Built For Everyone */}
        <section className="py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Built For Everyone</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: `Developers`,icon: <FiCode />, desc: "Highlight your projects and skills dynamically." },
              { title: "Designers",icon: <FaPaintBrush />, desc: "Showcase creative work with stunning visuals." },
              { title: "Freelancers",icon: <FiUsers />, desc: "Convert visitors into clients using smart presentation." },
            ].map((item, i) => (
              <Card key={i} className="hover:shadow-lg transition">
                <CardContent className="py-10 space-y-2 flex flex-col items-center justify-center">
                  <div className="text-3xl text-blue-600 ">{item.icon}</div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Build Yours?</h2>
          <p className="mb-8 max-w-2xl mx-auto text-white/90">
            Join hundreds of creators using PortaBuild to showcase their skills and grow their careers.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-white text-blue-600 hover:bg-gray-100">
              <a href="/register">Create My Portfolio</a>
            </Button>
            <Button asChild variant="outline" className="text-blue-600 border-white hover:bg-white/10">
              <a href="/users">Explore Users</a>
            </Button>
          </div>
        </section>
      </div>
      <HomeFooter />
    </>
  )
}
