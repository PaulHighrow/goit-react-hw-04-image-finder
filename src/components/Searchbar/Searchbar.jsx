import PropTypes from 'prop-types';
import { Search } from './Searchbar.styled';
import toast, { Toaster } from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const handleFormSubmit = evt => {
    evt.preventDefault();
    let query = evt.currentTarget.query.value.trim();
    if (query) {
      onSubmit(query);
    } else {
      toast.error("Please enter what you're looking for first!", {
        duration: 2000,
        position: 'top-right',
      });
    }
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <Search />
        </button>
        <Toaster />
        <input
          className="SearchForm-input"
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// import { Component } from 'react';

// export class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleFormSubmit = evt => {
//     evt.preventDefault();
//     this.props.onSubmit(this.state.query);
//     // this.reset();
//   };

//   handleSetQuery = ({ target: { name, value } }) => {
//     this.setState({
//       [name]: value,
//     });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleFormSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             name="query"
//             value={this.state.query}
//             onChange={this.handleSetQuery}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
