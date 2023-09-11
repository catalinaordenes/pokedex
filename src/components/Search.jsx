import React, { useState } from 'react';

const Search = ({ onChange, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onChange(term);
  };

  return (
    <nav>
      <div className="nav-wrapper custom-color">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              required
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </nav>
  );
}

export default Search;
