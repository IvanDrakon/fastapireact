const FinnanceInput = () => {
  return (
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
  );
};

export default FinnanceInput;
