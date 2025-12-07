"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiFeather, FiBarChart2, FiLayers, FiArrowRight } from "react-icons/fi"; 
import Navbar from "@/components/layouts/HomeNav";
import Footer from "@/components/layouts/HomeFooter";
import { Button } from "@/components/ui/button";
import desktopImg from "/desktop.JPG";
import mobileImg from "/mobile.JPG";
import dashboarJPG from "/dashboard.JPG"

export default function Home() {
    return (
        <>
            <Navbar />

            {/* Hero Section: Maximize Value Proposition and Improve Layout Spacing */}
            {/* Increased padding and removed min-h-screen to let content dictate height slightly better */}
            <section className="relative bg-white pt-14 pb-24 flex flex-col items-center justify-center overflow-hidden">
                {/* Background Gradient Effect - Subtle and modern */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-white to-white"></div>
                
                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16 lg:gap-24">

                    {/* Left content: Headline and CTAs */}
                    {/* Added `md:w-1/2` to explicitly allocate space */}
                    <div className="md:w-1/2 space-y-7 py-10 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
                        >
                            <span className="text-indigo-600">Launch Your Custom Portfolio</span> in Minutes.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-gray-600 text-xl max-w-lg mx-auto md:mx-0"
                        >
                            Stop settling for templates. PortaBuild is the <b>no-code platform</b> that gives you granular control over every detail, from themes to <b>individual button icons</b>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.7 }}
                            className="flex justify-center md:justify-start flex-wrap gap-4 mt-8"
                        >
                            <Button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-transform transform hover:scale-[1.02] font-semibold"
                                onClick={() => (window.location.href = "/register")} 
                            >
                                Start Building Now 
                                <FiArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-lg px-8 py-6"
                                onClick={() => (window.location.href = "/users")} 
                            >
                                View Portfolios
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right content: Layered Device Frames (Now explicitly takes 1/2 space) */}
                    <div className="md:w-1/2 relative h-[450px] md:h-[550px] w-full flex flex-col-reverse md:flex-row justify-center items-center py-10 md:py-0">
                        
                        {/* Desktop Mockup - Positioned for balance */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.0, ease: "easeOut" }}
                            className="absolute z-0 min-w-[330px] max-w-[450px] h-[280px] lg:w-[480px] lg:h-[300px] left-1/2 -translate-x-1/2 -translate-y-1/4 md:translate-y-0"
                        >
                            <div className="w-full h-full rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-300 bg-white relative">
                                {/* Realistic Laptop top bar */}
                                <div className="h-5 bg-gray-100 flex items-center px-3 space-x-1.5">
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                </div>
                                <img
                                    src={dashboarJPG}
                                    alt="PortaBuild Dashboard Preview"
                                    className="w-full h-full object-fit"
                                />
                            </div>
                        </motion.div>

                        {/* Mobile Mockup - Layered in front and offset for visual separation */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, x: -50 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            transition={{ delay: 0.3, duration: 1.0, ease: "easeOut" }}
                            className="absolute z-10 w-48 h-96 translate-x-1/4 translate-y-1/8 md:translate-x-[200px] md:translate-y-1/4"
                        >
                            <div className="w-full h-full rounded-[40px] shadow-2xl overflow-hidden border-[6px] border-gray-900 bg-black relative">
                                <img
                                    src={mobileImg}
                                    alt="Mobile Portfolio Preview"
                                    className="w-full h-full object-fit rounded-[34px]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* Features Section: Highlight Key Differentiators */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-gray-900"
                    >
                        Design Power, No Code Complexity
                    </motion.h2>

                    <div className="grid gap-10 md:grid-cols-3">
                        <FeatureCard
                            icon={<FiFeather className="text-indigo-600 text-4xl" />}
                            title="True Granular Customization"
                            description="Go beyond color palettes. Manage button text, icon styles, fonts, and spacing directly. If you can see it, you can change it."
                        />
                        <FeatureCard
                            icon={<FiLayers className="text-indigo-600 text-4xl" />}
                            title="Switch Themes Instantly"
                            description="Choose from a curated library of high-conversion, professional themes. Swap designs anytime with a single click, keeping your content intact."
                        />
                        <FeatureCard
                            icon={<FiBarChart2 className="text-indigo-600 text-4xl" />}
                            title="Built-in Audience Insights"
                            description="Know who's viewing your work. Track portfolio views, click-through rates, and top-performing projects, all in real-time."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
}

// Feature Card Component (Styling adjusted for a more modern feel)
function FeatureCard({ icon, title, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="flex justify-center mb-6">{icon}</div>
            <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
}