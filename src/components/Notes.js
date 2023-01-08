import { useContext } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Notes = ({notes}) => {
  const firebase = useContext(FirebaseContext);
  const alert = useContext(AlertContext);
  const { hide}  = useContext(AlertContext)

  const handleRemoveNote = (id) => {
    firebase.removeNote(id)
      .then(() => alert.show('Заметка была удалена', 'success'))
      .catch(() => alert.show('Что-то пошло не так', 'danger'))
    setTimeout(() => hide(), 2000)
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