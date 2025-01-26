function MoveCardModal({ columns, onSubmit, onCancel }) {
  const [selectedColumn, setSelectedColumn] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedColumn);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        <option value="" disabled>
          Select a column
        </option>
        {columns.map((col) => (
          <option key={col._id} value={col._id}>
            {col.name}
          </option>
        ))}
      </select>
      <div>
        <Button type="submit">Move</Button>
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default MoveCardModal;
