import React, { useState, useEffect } from "react";
import { ChevronRight, Users, Trophy, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [currentBid, setCurrentBid] = useState(1250);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);

    const bidInterval = setInterval(() => {
      setCurrentBid((prev) => prev + Math.floor(Math.random() * 50) + 10);
    }, 3000);

    const timeInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(bidInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const stats = [
    { icon: Users, value: "10K+", label: "Active Bidders" },
    { icon: Trophy, value: "500+", label: "Auctions Won" },
    { icon: Star, value: "4.9", label: "User Rating" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12 lg:py-20 min-h-screen">
        {/* Left Content */}
        <div
          className={`max-w-2xl transform transition-all duration-1000 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-6">
            <span className="text-purple-300 text-sm font-medium">
              🔥 Live Auctions Available
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bid. Win.{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Celebrate.
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Welcome to AuctionHub – your ultimate destination for real-time
            bidding and unbeatable deals. Join thousands of bidders and grab
            your dream item today!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => navigate("/signup")}
              className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center">
                Start Bidding Now
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-white/10">
              Browse Auctions
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure bidding</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span>24/7 support</span>
            </div>
          </div>
        </div>

        {/* Right Content - Interactive Auction Card */}
        <div
          className={`w-full lg:w-1/2 mt-10 lg:mt-0 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Main auction card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Premium Watch
                    </h3>
                    <p className="text-gray-400 text-sm">Luxury Collection</p>
                  </div>
                </div>
                <div className="bg-green-500/20 px-3 py-1 rounded-full">
                  <span className="text-green-400 text-sm font-medium">
                    Live
                  </span>
                </div>
              </div>

              {/* Auction image placeholder */}
              <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl mb-6 flex items-center justify-center">
                <div className="text-6xl">⌚</div>
              </div>

              {/* Bidding info */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Bid</span>
                  <span className="text-2xl font-bold text-white">
                    ₹{currentBid.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Time Left</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 font-mono">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Bidders</span>
                  <span className="text-white font-semibold">24 active</span>
                </div>
              </div>

              {/* Bid button */}
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Place Bid - ₹{(currentBid + 50).toLocaleString()}
              </button>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-screen h-20 fill-white"
        >
          <path d="M0,0 C720,100 720,100 1440,0 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
