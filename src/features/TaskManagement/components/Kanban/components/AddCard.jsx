import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import DatePicker from "../../../../../components/DatePicker";

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium"); // Default priority
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
      assignee,
      dueDate,
      priority,
    };

    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="taskText" className="sr-only">
              Task Description
            </label>
            <textarea
              id="taskText"
              onChange={(e) => setText(e.target.value)}
              autoFocus
              placeholder="Add new task..."
              className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
          </div>

          {/* Assignee Input */}
          <div className="mb-4">
            <label htmlFor="assignee" className="sr-only">
              Assignee
            </label>
            <select
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="mt-2 w-full rounded border border-neutral-400 bg-neutral-800 p-2 text-sm text-neutral-50 focus:outline-0"
            >
              <option value="">Select an assignee</option>
              <option value="Seblewongel">Seblewongel</option>
              <option value="Kbruysfa">Kbruysfa</option>
              <option value="Fasika">Fasika</option>
            </select>
          </div>

          {/* Due Date Input */}
          <div className="mb-4">
            <DatePicker
              field={{
                value: { dueDate },
                label: "Due Date",
                name: "dueDate",
                placeholder: "YYYY-MM-DD",
              }}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Priority Dropdown */}
          <div className="mb-4">
            <label htmlFor="priority" className="sr-only">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-2 w-full rounded border border-neutral-400 bg-neutral-800 p-2 text-sm text-neutral-50 focus:outline-0"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="mt-2 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
