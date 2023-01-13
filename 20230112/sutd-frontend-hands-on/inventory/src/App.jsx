import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ItemsDisplay from './components/ItemsDisplay';
import AddItem from './components/AddItem';
// import BuggyMutation from './components/BuggyMutation';

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


function App() {
  // never set data directly
  // data will be updated in the next render
  const [data, setData] = useState({ items: [] });
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/items").then(
      (response) =>
      response.json().then((data) => {
        console.log(data);
        setData({items:data})
      })
    )
    return () => {
      console.log("unmount")
    };
  }, []); // if dependency array is empty, line 30 will only be called once

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  }

  const deleteItem = useCallback((item) => {
    const items = data["items"]
    const requestOptions = {
      method: "DELETE"
    }

    fetch(`http://localhost:9000/items/${item.id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          //update the current state
          const idx = items.indexOf(item)
          // splice to index delete
          items.splice(idx, 1)
          setData({items: items})
        }
      }
    )
  }, []
  )

  const addItemToData = (item) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(item),
    }

    fetch("http://localhost:9000/items", requestOptions).then(
      (response)=>response.json()).then((responseData) => {
        console.log(responseData)
        let itemsValue = data["items"]
        itemsValue.push(responseData)
        setData({items:itemsValue})
      }
    )
  }

  const filterData = (data) => {
    let filtersPrice = parseInt(filters.price);
    // check if at least one field is true
    if (
      (filters.name === "" || filters.name === undefined) &&
      (filtersPrice === 0 || isNaN(filtersPrice)) &&
      (filters.type === "" || filters.type === undefined) &&
      (filters.brand === "" || filters.brand === undefined)
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
          <ItemsDisplay items={filterData(data["items"])}
          deleteItem={deleteItem} />
        </div>
        <div className="row mt-3">
          <AddItem addItem={addItemToData} />
        </div>
      </div>
    </Wrapper>
  )
}

export default App;
