import { ReactElement, useState } from "react";
import { Item } from "../App";

type SearchBarProps = {
  updateSearchParams: (item: Item) => void;
};

const SearchBar = ({ updateSearchParams }: SearchBarProps): ReactElement => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const [brand, setBrand] = useState<string>("");

  const searchButtonPressed = () => {
    updateSearchParams({ name: name, price: price, type: type, brand: brand });
  };

  return (
    <div className="container">
      <div className="row">
        <h2>Search for an Item</h2>
      </div>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="name-search-search-field">Name: </label>
            <input
              id="name-search-field"
              type="text"
              value={name} // this is controlled input
              className="form-control"
              onChange={(e) => {
                setName(e.target.value); // this is called whenever there's any change in user input, we manually then call setX to udpate state
              }}
            />
          </div>
          <div className="col">
            <label htmlFor="price-search-field">Max Price: </label>
            <input
              id="price-search-field"
              type="number"
              value={price}
              className="form-control"
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
            />
          </div>
          <div className="col">
            <label htmlFor="type-search-field">Type: </label>
            <input
              className="form-control"
              id="type-search-field"
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <label htmlFor="brand-search-field">Brand: </label>
            <input
              className="form-control"
              id="brand-search-field"
              type="text"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-3">
          {/* fake col-4 stuff */}
          <div className="col col-4"></div>
          <button
            type="button"
            className="col-4 btn btn-primary"
            onClick={searchButtonPressed}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
