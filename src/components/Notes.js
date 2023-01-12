import { useDispatch, useSelector } from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { hide, show } from '../features/alert/alertSlice';
import { removeNote } from '../features/notes/notesSlice';

export const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes)

  const handleRemoveNote = (id) => { 
    dispatch(removeNote(id)).unwrap()
      .then(() => dispatch(show({text:'Заметка была удалена', type:'success'})) )
      .catch(() => dispatch(show({text:'Что-то пошло не так',  type:'danger'})));
    setTimeout(() => dispatch(hide()), 2000)
  }

  return (
    <TransitionGroup component={'ul'} className="list-group">
      {notes.map(note => (
        <CSSTransition 
          key={note.id}
          classNames={'note'}
          timeout={800}
        >
          <li className="list-group-item note">
            <div>
              <strong>{note.title}</strong>
              <small>{note.date.slice(0,10)}</small>
            </div>          
            <button 
              type="button"
              className="btn btn-danger btm-sm"
              onClick={() => handleRemoveNote(note.id)}
              >
                &times;
            </button>
          </li>
        </CSSTransition>
        
      ))}      
    </TransitionGroup>
  )
}