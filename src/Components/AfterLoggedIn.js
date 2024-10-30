import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import image from "./sultan.jpg";

// Header Component
const Header = ({ user }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-6">
        {user && (
          <div className="flex-1">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight"
              style={{ direction: "rtl" }}
            >
              أهلا وسهلا بك،{" "}
              {user.role === "officer" ? user.name : "حارس البوابة الرئيسية"}
            </h1>
            <p
              className="text-lg text-gray-600 mt-2 font-medium"
              style={{ direction: "rtl" }}
            >
              {user.role === "guard" ? "حارس أمن" : "ضابط"}
            </p>
            {user.role === "guard" && (
              <p
                className="text-lg text-gray-600 mt-2 font-medium"
                style={{ direction: "rtl" }}
              >
                مرحباً بك في نظام إدارة الأمن
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Hero Section Component
const HeroSection = ({ imageLoaded, setImageLoaded }) => (
  <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 group">
    <div
      className={`transition-all duration-700 ease-in-out ${
        imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <img
        src={image}
        alt="مرحبا بك"
        className="w-full object-cover h-[400px] sm:h-[500px] lg:h-[600px] transition-transform duration-700 group-hover:scale-105"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          e.target.src = "fallback-image.jpg"; // Add a fallback image
          setImageLoaded(true);
        }}
      />
    </div>

    <div className="absolute flex items-center justify-center">
      <div className="px-6 py-8 sm:px-12 sm:py-10 rounded-xl backdrop-blur-sm bg-black/20 max-w-3xl mx-4 transform transition-all duration-500 hover:scale-[1.02]">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight text-center "
          style={{ direction: "rtl" }}
        >
          مرحباً بك في نظام إدارة الأمن
        </h2>
        <p
          className="text-lg sm:text-xl text-gray-100 font-medium text-center"
          style={{ direction: "rtl" }}
        >
          نحن سعداء بانضمامك إلى فريقنا
        </p>
      </div>
    </div>
  </div>
);

// Statistics Component
const Statistics = ({ visitors, user }) => {
  if (user.role !== "guard") return null;

  const totalVisitors = visitors.length;
  const officers = visitors.filter((visitor) => visitor.rank === "ضباط").length;
  const seniorLeaders = visitors.filter(
    (visitor) => visitor.rank === "كبار القادة"
  ).length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/dashboard" className="block">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform cursor-pointer">
            <h3 className="text-2xl font-bold mb-4 text-white text-right">
              إجمالي الزوار
            </h3>
            <p className="text-3xl font-bold text-white">{totalVisitors}</p>
          </div>
        </a>

        <a href="/dashboard" className="block">
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform cursor-pointer">
            <h3 className="text-2xl font-bold mb-4 text-white text-right">
              ضباط
            </h3>
            <p className="text-3xl font-bold text-white">{officers}</p>
          </div>
        </a>

        <a href="/dashboard" className="block">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transform cursor-pointer">
            <h3 className="text-2xl font-bold mb-4 text-white text-right">
              كبار القادة
            </h3>
            <p className="text-3xl font-bold text-white">{seniorLeaders}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

// Main Component
const AfterLoggedIn = () => {
  const [user, setUser] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(loggedInUser);
      const storedVisitors = JSON.parse(localStorage.getItem("visitors")) || [];
      setVisitors(storedVisitors);
    } catch (error) {
      console.error("Error loading user data:", error);
      // Handle error - maybe redirect to login
    }
  }, []);

  // Add a loading state
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 via-blue-100 to-white">
        <div className="text-2xl text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <Header user={user} />
        <div className="lg:col-span-3 mb-8">
          <Statistics visitors={visitors} user={user} />
        </div>
        <HeroSection
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <Sidebar
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLoggedIn;
