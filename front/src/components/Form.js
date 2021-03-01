import React, { useContext, useRef, useState } from "react";
import { HOST_API } from "../HOST_API";
import { Store } from "./StoreProvider";
import { Button } from "react-bootstrap";

const Form = () => {
  const formRef = useRef(null);
  const {
    dispatch,
    state: { todo },
  } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      completed: false,
    };
    if (state.name !== undefined) {
      fetch(HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    } else {
      alert("No puede ser vacio");
    }
  };

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted,
    };
    if (state.name !== undefined) {
    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
    } else {
      alert("No puede ser vacio");
    }
  };

  return (
    <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="¿Qué piensas hacer hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value });
        }}
      ></input>
      &nbsp;
      {item.id && (
        <Button onClick={onEdit} variant="success">
          Actualizar
        </Button>
      )}
      {!item.id && (
        <Button onClick={onAdd} variant="success">
          Crear
        </Button>
      )}
    </form>
  );
};

export default Form;
