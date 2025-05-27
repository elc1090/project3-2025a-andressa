import React, { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data.label);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    data.updateNodeLabel(id, value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
    }
  };

  return (
    <div
      className="bg-black text-white border-2 border-purple-600 rounded p-2 min-w-[100px] min-h-[50px] resize overflow-auto"
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="bg-black text-white outline-none border-b border-purple-600 w-full"
        />
      ) : (
        <div>{value}</div>
      )}

      <Handle type="target" position={Position.Top} style={{ background: "#a855f7" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#a855f7" }} />
    </div>
  );
};

export default CustomNode;