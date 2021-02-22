import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
      },
    })
      .then((response) => response.json())
      .then(setCategories);
  };

  const addCategory = (category) => {
    return fetch("http://localhost:8000/categories", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getCategories);
  };

  const removeCategory = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "DELETE",
    }).then(getCategories);
  };

  const updateCategory = (category) => {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then(getCategories);
  };

  /*
        You return a context provider which has the
        `categories` state, the `addCategories` function,
        and the `getCategory` function as keys. This
        allows any child elements to access them.
    */
  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        getCategories,
        removeCategory,
        updateCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
