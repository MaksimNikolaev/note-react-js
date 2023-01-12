import { useState } from "react";
import { useDispatch } from "react-redux";
import { hide, show } from "../features/alert/alertSlice";
import { addNote } from "../features/notes/notesSlice";

export const Form = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();    
    if (value.trim()) {
      dispatch(addNote(value.trim())).unwrap()
        .then(() => dispatch(show({text:'Заметка была создана', type:'success'})))  
        .catch(() => dispatch(show({text:'Что-то пошло не так', type:'danger'})))
      setValue('')
    } else {
      dispatch(show({text:'Введите название заметки', type:'warning'}))
    }
    setTimeout(() =>  dispatch(hide()), 2000)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input 
          type='text'
          className="form-control"
          placeholder="Введите название заметки"
          value={value}
          onChange={e => setValue(e.target.value)}
          >          
        </input>
      </div>
    </form>
  )
}