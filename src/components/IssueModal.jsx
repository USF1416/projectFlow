import { useState } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";

export default function IssueModal({ issue, users, onClose, onSave }) {
  const [title, setTitle] = useState(issue.title);
  const [status, setStatus] = useState(issue.status);
  const [priority, setPriority] = useState(issue.priority);
  const [assigneeId, setAssigneeId] = useState(issue.assigneeId);
  const [description, setDescription] = useState(issue.description || "");
  const [error, setError] = useState("");

  const save = () => {
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    onSave({
      title: title.trim(),
      status,
      priority,
      assigneeId,
      description,
    });
  };

  return (
    <Modal
      title={`${issue.id} — Issue details`}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>Save</Button>
        </>
      }
    >
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
      />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
      >
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </Select>

        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>

        <Select
          label="Assignee"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <textarea
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="help">Keep it short and actionable.</div>
      </div>
    </Modal>
  );
}
