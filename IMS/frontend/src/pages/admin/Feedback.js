"use client";
import { useEffect, useState } from "react";
import { submissionService } from "../../services/submissionService";
import { feedbackService } from "../../services/feedbackService";
import { toast } from "react-hot-toast";
import {
  ClipboardDocumentCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  PaperAirplaneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackText, setFeedbackText] = useState({});
  const [statusLoading, setStatusLoading] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await submissionService.getAllSubmissions();
        const pendingSubmissions = res.submissions.filter(
          (sub) => sub.status === "pending"
        );
        setSubmissions(pendingSubmissions || []);
      } catch (err) {
        toast.error("Error fetching submissions.");
        console.error("Error fetching submissions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setStatusLoading((prev) => ({ ...prev, [id]: true }));
      await submissionService.updateSubmission(id, status);
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
      toast.success(`Submission ${status} successfully.`);
    } catch (err) {
      toast.error("Failed to update submission status.");
      console.error("Error updating submission:", err);
    } finally {
      setStatusLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleFeedbackSubmit = async (submissionId) => {
    try {
      const message = feedbackText[submissionId];
      if (!message) {
        toast.error("Feedback message cannot be empty.");
        return;
      }
      await feedbackService.submitFeedback(submissionId, { message });
      toast.success("Feedback submitted successfully.");
      setFeedbackText((prev) => ({ ...prev, [submissionId]: "" }));
    } catch (err) {
      toast.error("Failed to submit feedback.");
      console.error("Error submitting feedback:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-200 p-8">
        <div className="h-10 bg-zinc-800 rounded-lg w-full animate-pulse mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-2xl bg-zinc-800 h-24 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200 p-6 md:p-8 lg:p-12">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Admin Submissions
        </h1>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          Review and provide feedback on pending submissions.
        </p>
      </header>

      {submissions.length === 0 && (
        <div className="text-center py-20 rounded-2xl bg-zinc-800 border border-zinc-700">
          <ClipboardDocumentCheckIcon className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <p className="font-semibold text-zinc-300 text-xl">
            No Pending Submissions
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            All submissions have been reviewed.
          </p>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-zinc-700">
          <ul className="divide-y divide-zinc-700">
            {submissions.map((sub) => (
              <li key={sub._id} className="bg-zinc-800 p-6 flex flex-col md:flex-row md:items-center md:justify-between transition-colors hover:bg-zinc-700">
                <div className="md:flex-1 md:pr-4 mb-4 md:mb-0">
                  <div className="flex items-center mb-1">
                    <span className="font-bold text-lg text-white mr-2">{sub.taskId?.title || "Untitled Task"}</span>
                    <span className="flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-600 text-white">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      PENDING
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm line-clamp-2">{sub.taskId?.description || "No description provided."}</p>
                  <div className="text-sm space-y-1 mt-2 text-zinc-400">
                    <p>
                      <span className="font-semibold text-white">User:</span> {sub.userId?.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-white">Links:</span>
                      <a href={sub.githubRepoUrl} className="text-green-500 hover:text-green-400 underline ml-2" target="_blank" rel="noreferrer">GitHub</a>,
                      <a href={sub.linkedinPostUrl} className="text-green-500 hover:text-green-400 underline ml-1" target="_blank" rel="noreferrer">LinkedIn</a>
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  {/* Feedback and Actions Section */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <textarea
                        value={feedbackText[sub._id] || ""}
                        onChange={(e) => setFeedbackText((prev) => ({ ...prev, [sub._id]: e.target.value }))}
                        placeholder="Provide feedback here..."
                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg p-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                        rows="2"
                      />
                      <button
                        onClick={() => handleFeedbackSubmit(sub._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition"
                        disabled={!feedbackText[sub._id]}
                      >
                        <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                        Submit Feedback
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={statusLoading[sub._id]}
                        onClick={() => handleStatusChange(sub._id, "approved")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                        Approve
                      </button>
                      <button
                        disabled={statusLoading[sub._id]}
                        onClick={() => handleStatusChange(sub._id, "rejected")}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <XCircleIcon className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminSubmissions;