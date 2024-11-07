import React, { useState } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";

const Column = ({ title, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((c) => c.column === column);

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const cardToMove = cards.find((c) => c.id === cardId);

    if (!cardToMove) return;

    // Update the column of the card
    const updatedCard = { ...cardToMove, column };

    // Update the cards state
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === cardId ? updatedCard : card))
    );
    setActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragLeave = () => setActive(false);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-neutral-500">{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            {...card} // Spread the card properties including assignee, dueDate, and priority
            handleDragStart={handleDragStart}
          />
        ))}
        <DropIndicator column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

export default Column;
