import { ReactElement } from "react";
import { Item } from "../App";

function displayData(dictionary: Item, key: keyof Item) {
  if (key in dictionary) {
    if (dictionary[key] === "") return "N/A";
    else return dictionary[key];
  }
  return "No data to display";
}

type ItemsDisplayProps = {
  items: Item[];
  deleteItem: (item: Item) => void;
};

const ItemsDisplay = ({
  items,
  deleteItem,
}: ItemsDisplayProps): ReactElement => {
  const showItem = (item: Item) => {
    return (
      <tr>
        {/* <StyledParagraph> */}
        <th key="id" scope="row">
          {displayData(item, "id")}
        </th>
        <th key="name" scope="row">
          {displayData(item, "name")}
        </th>
        <th key="price" scope="row">
          {displayData(item, "price")}
        </th>
        <th key="type" scope="row">
          {displayData(item, "type")}
        </th>
        <th key="brand" scope="row">
          {displayData(item, "brand")}
        </th>
        {/* </StyledParagraph> */}
        <td>
          <button className="btn btn-danger" onClick={() => deleteItem(item)}>
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <h2> Items</h2>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr key="">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Brand</th>
            </tr>
          </thead>
          {/* each value returned by map is going to be a row, within a row exists 5 items mapped to the 5 columns */}
          <tbody>{items.map(showItem)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsDisplay;
