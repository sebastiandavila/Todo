import React, { useContext, useEffect } from 'react';
import {HOST_API} from "../HOST_API"
import { Store } from "./StoreProvider"
import { Button, Table } from 'react-bootstrap';

const List = () => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;
  
    useEffect(() => {
        
      fetch(HOST_API+"/todos")
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "update-list", list })
        })
    }, [dispatch]);
  
  
    const onDelete = (id) => {
        
      fetch(HOST_API+"/"+ id + "/todo", {
        method: "DELETE"
      }).then((list) => {
        dispatch({ type: "delete-item", id })
      })
    };
  
    const onEdit = (todo) => {
      dispatch({ type: "edit-item", item: todo })
    };
  
    const onChange = (event, todo) => {
      const request = {
        name: todo.name,
        id: todo.id,
        completed: event.target.checked
      };
      fetch("http://localhost:8080/api/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
        });
    };
  
    const decorationDone = {
      textDecoration: 'line-through'
    };
    return <div className="divTable">
    
      <Table striped bordered hover variant="light " className="tabla">
        <thead>
          <tr >
            <th>ID</th>
            <th>Tarea</th>
            <th>¿Completado?</th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((todo) => {
            return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
              <td><Button variant="danger" onClick={() => onDelete(todo.id)}>Eliminar</Button></td>
              <td><Button variant="primary" onClick={() => onEdit(todo)}>Editar</Button></td>
            </tr>
          })}
        </tbody>
      </Table>
      
    </div>
  }

  export default List;