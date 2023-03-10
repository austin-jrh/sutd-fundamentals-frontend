import { useState, useEffect, useCallback } from "react";
import "./App.css";
import AddItem from "./components/AddItem";
import SearchBar from "./components/SearchBar";
import ItemsDisplay from "./components/ItemsDisplay";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: midnightblue;
  font-weight: bolder;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding-top: 5em;
  background: ghostwhite;
`;

export interface Item {
  id?: number;
  name: string;
  price: number;
  type: string;
  brand: string;
}

interface Data {
  items: Item[];
}

function App() {
  const [data, setData] = useState<Data>({ items: [] });
  const [filters, setFilters] = useState<Item | null>(null);

  useEffect(() => {
    fetch("http://localhost:9000/items").then((response) =>
      response.json().then((data) => {
        console.log(data);
        setData({ items: data });
      })
    );
    return () => {
      console.log("unmount");
    };
  }, []);

  const updateFilters = (searchParams: Item) => {
    setFilters(searchParams);
  };

  const deleteItem = useCallback((item: Item) => {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:9000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          //update the current state
          const idx = items.indexOf(item);
          // splice to index delete
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  }, []);

  const addItemToData = (item: Item) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:9000/items", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        let itemsValue = data["items"];
        itemsValue.push(responseData);
        setData({ items: itemsValue });
      });
  };

  const filterData = (data: Item[]) => {
    // check if at least one field is true
    if (
      filters === null ||
      ((filters.name === "" || filters.name === undefined) &&
        (filters.price === 0 || isNaN(filters.price)) &&
        (filters.type === "" || filters.type === undefined) &&
        (filters.brand === "" || filters.brand === undefined))
    ) {
      console.log("no search, returning all items");
      return data;
    }

    const filteredData = data.filter((item) => {
      // must match all
      return (
        (item.name === filters.name || filters.name === "") &&
        (filters.price >= item.price || filters.price === 0) &&
        (item.type === filters.type || filters.type === "") &&
        (item.brand === filters.brand || filters.brand === "")
      );
    });
    return filteredData;
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <Title color="gray">Item Inventory Tracker</Title>
        </div>
        <div className="row mt-3">
          <SearchBar updateSearchParams={updateFilters} />
        </div>
        <div className="row mt-3">
          <ItemsDisplay
            items={filterData(data["items"])}
            deleteItem={deleteItem}
          />
        </div>
        <div className="row mt-3">
          <AddItem addItem={addItemToData} />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
