"use client";
import React, { useState, useEffect } from "react";
import { taskService } from "../services/taskService";
import { submissionService } from "../services/submissionService";
import { feedbackService } from "../services/feedbackService";
import {
  FolderOpen,
  CheckCircle,
  Clock,
  RotateCcw,
  Check,
  X,
  Link,
  MailOpen,
  Github,
  Linkedin,
  LucideX,
  LayoutGrid,
  Rows3,
  Watch
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function SeeUserTask() {
 
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);

  const [openHistory, setOpenHistory] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [linkedinPostUrl, setLinkedinPostUrl] = useState("");
  const path = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(path.id);
        const res = await taskService.getApplicationTasks(path.id);
        const fetchedTasks = res.tasks || [];
        const user = res.user || {};
        setUser(user);
        setTasks(fetchedTasks);

        const data = {};
        for (let task of fetchedTasks) {
          const subRes = await submissionService.getSubmissionByTaskAndUser(task._id,user._id);
          let submissions = subRes?.submissions || [];
          const submissionsWithFeedback = [];
          for (let sub of submissions) {
            const fbRes = await feedbackService.getFeedbackBySubmission(
              sub._id
            );
            submissionsWithFeedback.push({
              ...sub,
              feedback: fbRes?.feedbacks || [],
            });
          }
          data[task._id] = { submissions: submissionsWithFeedback };
        }
        setTaskData(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        toast.error("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const getStatusConfig = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "Pending",
          className: "bg-amber-800 text-amber-200",
          icon: <Clock className="h-4 w-4" />,
        };
      case "approved":
        return {
          text: "Approved",
          className: "bg-emerald-800 text-emerald-200",
          icon: <CheckCircle className="h-4 w-4" />,
        };
      case "rejected":
        return {
          text: "Rejected",
          className: "bg-rose-800 text-rose-200",
          icon: <X className="h-4 w-4" />,
        };
      default:
        return {
          text: "Not Submitted",
          className: "bg-zinc-700 text-zinc-300",
          icon: <MailOpen className="h-4 w-4" />,
        };
    }
  };

  const TaskCard = ({ task, isGridView }) => {
    const submissions = taskData[task._id]?.submissions || [];
    const latest = submissions[submissions.length - 1];
    const statusConfig = getStatusConfig(latest?.status);
    const isApproved = latest?.status === "approved";
    

    if (!isGridView) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 hover:shadow-lg">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="font-bold text-lg text-zinc-50 truncate">
              {task.title}
            </h2>
            <p className="text-zinc-400 text-sm truncate">{task.description}</p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 mt-2 sm:mt-0">
            <span
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusConfig.className}`}
            >
              {statusConfig.icon}
              {statusConfig.text}
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4">
            {isApproved && (
              <span className="text-sm font-medium text-emerald-500 flex items-center gap-1">
                <Check className="h-4 w-4" /> Completed!
              </span>
            ) }
            {submissions.length > 0 && (
              <button
                className="text-sm text-white font-medium hover:text-gray-200 transition"
                onClick={() => {
                  setSelectedTask(task);
                  setOpenHistory(true);
                }}
              >
                See History <Watch size={16} className="inline"/>
              </button>
            )}
          </div>
        </div>
      );
    }

    // Grid view
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
        <div>
          <h2 className="font-bold text-xl text-zinc-50 mb-2 line-clamp-2">
            {task.title}
          </h2>
          <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
            {task.description}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusConfig.className}`}
          >
            {statusConfig.icon}
            {statusConfig.text}
          </span>
        </div>
        <div className="flex justify-between items-center mt-auto">
          {isApproved && (
            <span className="text-sm font-medium text-emerald-500 flex items-center gap-1">
              <Check className="h-4 w-4" /> Completed!
            </span>
          ) }
          {submissions.length > 0 && (
            <button
              className="text-sm text-white font-medium hover:text-gray-200 transition"
              onClick={() => {
                setSelectedTask(task);
                setOpenHistory(true);
              }}
            >
              See History <Watch className="inline" size={16}/>
            </button>
          )}
        </div>
      </div>
    );
  };

  const LoadingCard = ({ isGridView }) => (
    <div className={`bg-zinc-800 border border-zinc-700 rounded-xl shadow-sm p-5 animate-pulse ${!isGridView ? "flex items-center space-x-4" : ""}`}>
      <div className="flex-1 min-w-0 pr-4">
        <div className="h-6 bg-zinc-700 rounded-md w-3/4 mb-3"></div>
        {isGridView && (
          <>
            <div className="h-4 bg-zinc-700 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-zinc-700 rounded-md w-5/6 mb-4"></div>
          </>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center mt-4 sm:mt-0 gap-2">
        <div className="h-10 bg-zinc-700 rounded-lg w-28"></div>
        <div className="h-4 bg-zinc-700 rounded-md w-20"></div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-sm">
      <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <FolderOpen className="h-10 w-10 text-zinc-500" />
      </div>
      <h3 className="text-xl font-bold text-zinc-50 mb-2">
        No tasks assigned yet
      </h3>
      <p className="text-zinc-400 mb-6">
        Check back later or contact your mentor for more information.
      </p>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg">
          <div className="p-6 border-b border-zinc-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-zinc-50">{title}</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-200 transition"
            >
              <LucideX className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-50">
              {user.name}'s Tasks
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              If all the task are submitted and approve then mark this application completed
            </p>
          </div>
          <div className="flex items-center space-x-2 p-1 rounded-lg bg-zinc-800 border border-zinc-700">
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded-md transition ${isGridView ? "bg-zinc-700 text-blue-400" : "text-zinc-400 hover:text-zinc-200"}`}
              title="Grid View"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded-md transition ${!isGridView ? "bg-zinc-700 text-blue-400" : "text-zinc-400 hover:text-zinc-200"}`}
              title="List View"
            >
              <Rows3 className="h-5 w-5" />
            </button>
          </div>
        </header>

        {loading ? (
          <div className={`${isGridView ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}`}>
            {[...Array(3)].map((_, i) => (
              <LoadingCard key={i} isGridView={isGridView} />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={`${isGridView ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}`}>
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} isGridView={isGridView} />
            ))}
          </div>
        )}

        {selectedTask && (
          <>

            
            <Modal
              isOpen={openHistory}
              onClose={() => setOpenHistory(false)}
              title={`Submission History: ${selectedTask.title}`}
            >
              {taskData[selectedTask._id]?.submissions.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {taskData[selectedTask._id]?.submissions.map((sub) => (
                    <div
                      key={sub._id}
                      className="border border-zinc-700 rounded-lg p-4 bg-zinc-900"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${
                            getStatusConfig(sub.status).className
                          }`}
                        >
                          {getStatusConfig(sub.status).icon}
                          {getStatusConfig(sub.status).text}
                        </div>
                        <span className="text-xs text-zinc-500">
                          {new Date(sub.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-zinc-300">
                          <Link className="h-4 w-4 text-blue-400" />
                          <strong>GitHub:</strong>
                          <a
                            href={sub.githubRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline truncate"
                          >
                            {sub.githubRepoUrl}
                          </a>
                        </p>
                        {sub.linkedinPostUrl && (
                          <p className="flex items-center gap-2 text-zinc-300">
                            <Link className="h-4 w-4 text-blue-400" />
                            <strong>LinkedIn:</strong>
                            <a
                              href={sub.linkedinPostUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline truncate"
                            >
                              {sub.linkedinPostUrl}
                            </a>
                          </p>
                        )}
                      </div>
                      {sub.feedback?.length > 0 && (
                        <div className="mt-4 border-t border-zinc-700 pt-4">
                          <p className="text-sm font-medium text-zinc-300 mb-2">
                            Feedback:
                          </p>
                          <ul className="text-sm text-zinc-400 list-disc ml-5 space-y-1">
                            {sub.feedback.map((fb) => (
                              <li key={fb._id}>{fb.message}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-zinc-400 py-8">
                  No submission history available for this task.
                </p>
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}