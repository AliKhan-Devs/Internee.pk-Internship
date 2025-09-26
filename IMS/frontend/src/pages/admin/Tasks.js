"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Plus,
  Pencil,
  Trash2,
  ClipboardList,
 
  ListTodo,
  Calendar,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { taskService } from "../../services/taskService";
import { internshipService } from "../../services/internshipService";
import { HiBuildingOffice2 } from "react-icons/hi2";

const Tasks = () => {
  const [internships, setInternships] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Load internships
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const data = await internshipService.getAllInternships();
        setInternships(data.internships);
      } catch (error) {
        toast.error("Failed to fetch internships");
      }
    };
    fetchInternships();
  }, [internships]);

  // Load tasks when internship changes
  useEffect(() => {
    if (selectedInternship) {
      const fetchTasks = async () => {
        try {
          setLoading(true);
          const data = await taskService.getTasksByInternship(selectedInternship);
          setTasks(data.tasks || []);
        } catch (error) {
          toast.error("Failed to fetch tasks");
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }
  }, [selectedInternship]);

  // Submit handler for creating/updating tasks
  const onSubmit = async (formData) => {
    try {
      if (!selectedInternship) {
        toast.error("Please select an internship first");
        return;
      }
      setLoading(true);

      if (editingTask) {
        const updated = await taskService.updateTask(editingTask._id, formData);
        setTasks((prev) =>
          prev.map((t) => (t._id === editingTask._id ? updated.task : t))
        );
        toast.success("Task updated successfully");
      } else {
        const created = await taskService.createTask(selectedInternship, formData);
      
        setTasks((prev) => [...prev, created.task]);
        toast.success("Task created successfully");
      }

      reset();
      setEditingTask(null);
    } catch (error) {
      toast.error("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // Handle task editing
  const handleEdit = (task) => {
    setEditingTask(task);
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("deadline", task.deadline?.split("T")[0]);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-500/10 text-green-400">
            <ClipboardList className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-50">Task Management</h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Create, assign and manage internship tasks
            </p>
          </div>
        </div>

        {/* Internship Selector */}
        <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg max-w-lg">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            <HiBuildingOffice2 className="h-4 w-4 inline mr-2 text-green-400" />
            Select Internship
          </label>
          <select
            value={selectedInternship}
            onChange={(e) => setSelectedInternship(e.target.value)}
            className="w-full rounded-lg border-zinc-700 bg-zinc-900 text-zinc-50 focus:ring-green-500 focus:border-green-500 py-2.5 px-4"
          >
            <option value="">-- Select an Internship --</option>
            {internships.map((i) => (
              <option key={i._id} value={i._id}>
                {i.title}
              </option>
            ))}
          </select>
        </div>

        {/* Task Form */}
        {selectedInternship && (
          <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-zinc-50">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300">
                    <ListTodo className="h-4 w-4 inline mr-2 text-green-400" />
                    Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className={`w-full mt-1 rounded-lg border ${errors.title ? "border-rose-500" : "border-zinc-700"} bg-zinc-900 text-zinc-50 focus:ring-green-500 focus:border-green-500 py-2.5 px-4`}
                    placeholder="Task title"
                  />
                  {errors.title && (
                    <p className="text-rose-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300">
                    <Calendar className="h-4 w-4 inline mr-2 text-green-400" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    {...register("deadline", { required: "Deadline is required" })}
                    className={`w-full mt-1 rounded-lg border ${errors.deadline ? "border-rose-500" : "border-zinc-700"} bg-zinc-900 text-zinc-50 focus:ring-green-500 focus:border-green-500 py-2.5 px-4`}
                  />
                  {errors.deadline && (
                    <p className="text-rose-500 text-sm mt-1">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  <FileText className="h-4 w-4 inline mr-2 text-green-400" />
                  Description
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows={4}
                  className={`w-full mt-1 rounded-lg border ${errors.description ? "border-rose-500" : "border-zinc-700"} bg-zinc-900 text-zinc-50 focus:ring-green-500 focus:border-green-500 py-2.5 px-4`}
                  placeholder="Task description"
                />
                {errors.description && (
                  <p className="text-rose-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                {editingTask && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTask(null);
                      reset();
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium transition ${
                    loading
                      ? "bg-green-400 cursor-not-allowed"
                      : editingTask
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? (
                    "Saving..."
                  ) : editingTask ? (
                    <>
                      <Pencil className="h-5 w-5" />
                      Update Task
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      Create Task
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks Table */}
        {selectedInternship && (
          <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-zinc-50">
              Assigned Tasks
            </h2>
            {loading ? (
              <p className="text-zinc-400 text-center py-8">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">
                No tasks found for this internship.
              </p>
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-zinc-700">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium text-zinc-300">
                        Title
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-zinc-300">
                        Description
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-zinc-300">
                        Deadline
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-zinc-300 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    {tasks.map((task) => (
                      <tr key={task._id} className="text-zinc-200 hover:bg-zinc-700 transition-colors">
                        <td className="px-6 py-4 font-medium">{task.title}</td>
                        <td className="px-6 py-4 text-zinc-400 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {task.description}
                        </td>
                        <td className="px-6 py-4 text-zinc-400">
                          {new Date(task.deadline).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="text-green-500 hover:text-green-400 transition"
                          >
                            <Pencil className="h-5 w-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="text-rose-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="h-5 w-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;