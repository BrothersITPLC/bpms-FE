import React, { useState, useRef, useEffect } from "react";
import {
  FaChevronRight,
  FaChevronDown,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import {
  MdWorkspaces,
  MdSpaceDashboard,
  MdSubdirectoryArrowRight,
  MdFolder,
  MdFolderOpen,
  MdTask,
} from "react-icons/md";
import {
  useListFolderQuery,
  useListSpaceQuery,
  useListWorkspacesQuery,
} from "../apiSlice";

const WorkspaceTree = () => {
  const [data, setData] = useState([]); // Dynamic data from the database
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const editInputRef = useRef(null);
  // const [selectedFolder]
  const workspaces = useListWorkspacesQuery();
  const spaces = useListSpaceQuery(1);
  const folder = useListFolderQuery();

  useEffect(() => {
    if (editingItem && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingItem]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("/api/workspaces"); // Replace with your API endpoint
        const result = await response.json();
        setData(result); // Assume the result is an array of workspaces with nested data
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch workspaces:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (item) => {
    const updatedData = [...data];
    const toggleItem = (items) => {
      return items.map((i) => {
        if (i.id === item.id) {
          return { ...i, isOpen: !i.isOpen };
        }
        if (i.children) {
          return { ...i, children: toggleItem(i.children) };
        }
        return i;
      });
    };
    setData(toggleItem(updatedData));
  };

  const handleAdd = async (parentItem, type) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9), // Temporary ID
      name: `New ${type}`,
      type: type,
      isOpen: true,
    };

    if (!parentItem) {
      setData([...data, newItem]);
    } else {
      const updatedData = [...data];
      const addItem = (items) => {
        return items.map((i) => {
          if (i.id === parentItem.id) {
            return { ...i, children: [...(i.children || []), newItem] };
          }
          if (i.children) {
            return { ...i, children: addItem(i.children) };
          }
          return i;
        });
      };
      setData(addItem(updatedData));

      // Save the new item to the database
      try {
        const response = await fetch("/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parentId: parentItem.id,
            type,
            name: `New ${type}`,
          }),
        });
        if (response.ok) {
          const savedItem = await response.json();
          setData((prevData) =>
            addItem(prevData).map((i) => (i.id === newItem.id ? savedItem : i))
          );
        } else {
          console.error("Failed to save new item");
        }
      } catch (error) {
        console.error("Failed to save new item:", error);
      }
    }
  };

  const handleEditSave = async (item, newName) => {
    const updatedData = [...data];
    const editItem = (items) => {
      return items.map((i) => {
        if (i.id === item.id) {
          return { ...i, name: newName };
        }
        if (i.children) {
          return { ...i, children: editItem(i.children) };
        }
        return i;
      });
    };
    setData(editItem(updatedData));
    setEditingItem(null);

    // Save the updated name to the database
    try {
      await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
    } catch (error) {
      console.error("Failed to update item name:", error);
    }
  };

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${item.name}?`
    );
    if (confirmDelete) {
      const updatedData = [...data];
      const deleteItem = (items) => {
        return items
          .filter((i) => i.id !== item.id)
          .map((i) => {
            if (i.children) {
              return { ...i, children: deleteItem(i.children) };
            }
            return i;
          });
      };
      setData(deleteItem(updatedData));

      // Delete the item from the database
      try {
        await fetch(`/api/items/${item.id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    }
  };

  const renderIcon = (type, isOpen) => {
    switch (type) {
      case "workspace":
        return <MdWorkspaces className="text-blue-500" />;
      case "space":
        return <MdSpaceDashboard className="text-green-500" />;
      case "folder":
        return isOpen ? (
          <MdFolderOpen className="text-orange-500" />
        ) : (
          <MdFolder className="text-orange-500" />
        );
      case "task":
        return <MdTask className="text-red-500" />;
      default:
        return null;
    }
  };

  const renderTree = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.id} className={`ml-${level * 4}`}>
        <div className="flex items-center space-x-2">
          {item.children && (
            <button onClick={() => handleToggle(item)}>
              {item.isOpen ? <FaChevronDown /> : <FaChevronRight />}
            </button>
          )}
          {renderIcon(item.type, item.isOpen)}
          <span>{item.name}</span>
          <button onClick={() => handleDelete(item)} className="text-red-500">
            <FaTrash />
          </button>
        </div>
        {item.children && item.isOpen && renderTree(item.children, level + 1)}
      </div>
    ));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Workspace Tree</h1>
      {renderTree(spaces?.data)}
    </div>
  );
};

export default WorkspaceTree;
