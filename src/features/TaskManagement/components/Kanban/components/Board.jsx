import React, { useState } from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";

const DEFAULT_CARDS = [
  // Example of default cards with new fields
  {
    id: "1",
    column: "backlog",
    title: "Task 1",
    assignee: "Alice",
    dueDate: "2024-11-05",
    priority: "High",
  },
  {
    id: "2",
    column: "todo",
    title: "Task 2",
    assignee: "Bob",
    dueDate: "2024-11-10",
    priority: "Medium",
  },
  // Add more default cards if needed...
];

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  const columns = [
    { title: "Backlog", column: "backlog" },
    { title: "TODO", column: "todo" },
    { title: "In Progress", column: "doing" },
    { title: "Complete", column: "done" },
  ];

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      {columns.map(({ title, column }) => (
        <Column
          key={column}
          title={title}
          column={column}
          cards={cards}
          setCards={setCards}
        />
      ))}
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default Board;
