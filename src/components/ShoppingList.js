import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")
  const [newItems, setNewItems] = useState(items)

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    setSearch("")
  }

  function onSearchChange(event) {
    setSearch(event.target.value)
  }
  
  function onItemFormSubmit(newItem) {
    setNewItems([...newItems, newItem])    
  }

  function filterCategory(item) {
         if (selectedCategory === "All") {
           return true;
         } else {
           return item.category === selectedCategory;   
         }
  }
 
  const itemsToDisplay = newItems.filter((item) => {
    if (search !== "") {
      return item.name.toLowerCase().includes(search.toLowerCase());
    } else {
      return filterCategory(item)
    }
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} search={search} onSearchChange={onSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
