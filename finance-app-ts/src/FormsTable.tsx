// FormsTable.tsx
import { FormEvent, useState } from "react";
import { useForm } from "./useForm";
import { useTransactions } from "./useTransactions";

const initialFormData = {
  id: 0,
  amount: "",
  category: "",
  description: "",
  is_income: 0,
  date: "",
};

const FormsTable = () => {
  const { formData, handleInputChange, resetForm, setFormData } =
    useForm(initialFormData);
  const {
    transactions,
    deleteTransaction,
    createTransaction,
    updateTransaction,
  } = useTransactions();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (editingId) {
      await updateTransaction(editingId, formData);
      setEditingId(null);
    } else {
      await createTransaction(formData);
    }
    resetForm();
  };

  const handleEdit = (transaction: typeof initialFormData & { id: number }) => {
    setFormData({
      id: transaction.id,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      is_income: transaction.is_income,
      date: transaction.date,
    });
    setEditingId(transaction.id);
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            onChange={handleInputChange}
            value={formData.amount}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            onChange={handleInputChange}
            value={formData.category}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="is_income" className="form-label me-3">
            Income?
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="is_income"
            name="is_income"
            onChange={handleInputChange}
            checked={formData.is_income === 1}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={formData.date}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Submit"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              resetForm();
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mb-3 mt-3">
        <table className="table table-striped table-bordered table-hover">
          <thead className="align-middle">
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
              <th className="align-middle mx-auto">Actions</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? "Yes" : "No"}</td>
                <td>{transaction.date}</td>
                <td className="align-middle mx-auto">
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormsTable;
