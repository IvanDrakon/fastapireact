import { FormEvent, useEffect, useState } from "react";
import api from "./api";

const FormsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: 0,
    date: "",
  });

  const fetchTransactions = async () => {
    const response = await api.get("/transactions/");
    setTransactions(response.data);
  };

  const handleDelete = async (id: number) => {
    await api.delete("/transactions/" + id);
    fetchTransactions();
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await api.post("/transactions/", formData);
    fetchTransactions();
    setFormData({
      amount: "",
      category: "",
      description: "",
      is_income: 0,
      date: "",
    });
  };
  const handleInputChange = (event: {
    target: { type: string; checked: any; value: any; name: any };
  }) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
            value={formData.is_income}
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
          Submit
        </button>
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
              <th className="align-middle mx-auto">Delete</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {transactions.map((transaction: any) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? "Yes" : "No"}</td>
                <td>{transaction.date}</td>
                <td className="align-middle mx-auto">
                  <div className="btn-group mx-auto" role="group">
                    <button className="btn btn-warning">Edit</button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
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
