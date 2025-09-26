import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  XMarkIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentDuplicateIcon
} from "@heroicons/react/24/outline";

// Import solid icons for a richer look
import {
  HomeIcon as HomeIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  UsersIcon as UsersIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  UserPlusIcon as UserPlusIconSolid,
  AcademicCapIcon as AcademicCapIconSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
} from "@heroicons/react/24/solid";

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenuItems = [
    { text: "Dashboard", icon: HomeIcon, solidIcon: HomeIconSolid, path: "/dashboard" },
    { text: "Internships", icon: BuildingOfficeIcon, solidIcon: BriefcaseIconSolid, path: "/internships" },
    { text: "Applications", icon: ClipboardDocumentListIcon, solidIcon: ClipboardDocumentListIconSolid, path: "/applications" },
    { text: "Users", icon: UsersIcon, solidIcon: UsersIconSolid, path: "/users" },
    { text: "Tasks", icon: DocumentTextIcon, solidIcon: DocumentTextIconSolid, path: "/tasks" },
    { text: "Feedback", icon: ChatBubbleLeftRightIcon, solidIcon: ChatBubbleLeftRightIconSolid, path: "/feedback" },
    { text: "Create Admin", icon: UserPlusIcon, solidIcon: UserPlusIconSolid, path: "/create-admin" },
  ];

  const interneeMenuItems = [
    { text: "Dashboard", icon: HomeIcon, solidIcon: HomeIconSolid, path: "/dashboard" },
    { text: "Internships", icon: BuildingOfficeIcon, solidIcon: BriefcaseIconSolid, path: "/internships" },
    { text: "My Applications", icon: ClipboardDocumentListIcon, solidIcon: ClipboardDocumentListIconSolid, path: "/my-applications" },
    { text: "My Tasks", icon: DocumentTextIcon, solidIcon: DocumentTextIconSolid, path: "/my-tasks" },
    // { text: "My Submissions", icon: ClipboardDocumentCheckIcon, solidIcon: ClipboardDocumentCheckIconSolid, path: "/my-submissions" },
  ];

  const menuItems = isAdmin ? adminMenuItems : interneeMenuItems;

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`lg:w-[20rem] fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center space-x-4">
             <Link to="/"> <div className=" cursor-pointer w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <AcademicCapIconSolid className="h-6 w-6 text-white" />
              </div></Link>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {isAdmin ? "Admin Panel" : "Student Portal"}
                </h2>
                <p className="text-xs text-zinc-400">Internship Management</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-800"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = isActive ? item.solidIcon : item.icon;

                return (
                  <li key={item.text}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-green-600 text-white font-semibold shadow-lg shadow-green-500/20"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-white" : "text-zinc-500"
                        }`}
                      />
                      <span>{item.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-zinc-800">
            <div className="flex items-center space-x-3 bg-zinc-800 p-3 rounded-xl">
              <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Get in touch
                </p>
                <p className="text-xs text-zinc-400">
                  Connect with the team
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;