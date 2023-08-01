import { API_URL } from '../config';
import initialState from './initialState';

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const ADD_TABLE = createActionName('ADD_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');

//selectors
export const getAllTables = (state) => state.tables;
// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload });
export const removeTable = (payload) => ({ type: REMOVE_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });

//requests
export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        else return res.json()
      })
      .then((tables) => dispatch(updateTables(tables)));
  }
};

export const addTableRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTable),
    };
    fetch(`${API_URL}/tables`, options)
    .then((res)=> {
      if(!res.ok) {
        throw new Error('Something went wrong');
      }
      res.json().then((data)=>dispatch(addTable(newTable)))
    })
    .catch(error => console.log("Error: ", error));
  }
}

/* export const removeTableRequest = (id) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"id":id}),
    };
    fetch(`${API_URL}/tables/${id}`, options)
    .then((res)=> {
      if(!res.ok) {
        throw new Error('Something went wrong');
      }
      else {
        return res.json()
      }
    }).then(dispatch(removeTable(id)))
    .catch(error => console.log("Error: ", error));

  }
} */
export const removeTableRequest = (id) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${API_URL}/tables/${id}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((data) => {
        dispatch(removeTableRequest(id)); // Przekazujemy tylko id jako payload
      })
      .catch(error => console.log("Error: ", error));
  };
};


export const changeTableRequest = (editedTable) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...editedTable }),
    };
    fetch(`${API_URL}/tables/${editedTable.id}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return dispatch(editTable(editedTable))
      })
      .catch(error => console.log("Error: ", error));
  }
}

const tablesReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return action.payload; // Aktualizujemy stan tabel za pomocą nowych danych z payloadu
    case ADD_TABLE:
      return statePart === null ? [action.payload] : [...statePart, { ...action.payload }]; // Dodajemy nową tabelę do istniejących danych
    case REMOVE_TABLE:
      return statePart === null ? null : statePart.filter((table) => table.id !== action.payload); // Usuwamy tabelę na podstawie przekazanego ID
    case EDIT_TABLE:
      return statePart === null ? null : statePart.map((table) =>
        table.id === action.payload.id ? { ...table, ...action.payload } : table
      ); // Edytujemy tabelę na podstawie przekazanych zmian
    default:
      return statePart;
  }
};

export default tablesReducer;

