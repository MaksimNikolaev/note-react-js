import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import { hide, show } from '../features/alert/alertSlice';
import { removeNote } from '../features/notes/notesSlice';
import { Modal } from './Modal';

export const Notes = () => {
  const [isModal, setModal] = useState(false);
  const [value, setValue] = useState('');
  const [idNote, setIdNote] =  useState('')
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes)

  const handleRemoveNote = (id) => { 
    dispatch(removeNote(id)).unwrap()
      .then(() => dispatch(show({text:'Заметка была удалена', type:'success'})) )
      .catch(() => dispatch(show({text:'Что-то пошло не так',  type:'danger'})));
    setTimeout(() => dispatch(hide()), 2000)
  }
  
  const handleEditNote = (note) => {
    setValue(note.title)
    setIdNote(note.id)
    setModal(true)
  }

  return (
    <>
    <TransitionGroup component={'ul'} className="list-group">
      {notes.map(note => (
        <CSSTransition 
          key={note.id}
          classNames={'note'}
          timeout={800}
        >
          <li className="list-group-item note">
            <strong>{note.title}</strong>              
            <div>
              <small>{note.date.slice(0,10)}</small>
              <button 
                type="button"
                data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"
                className="btn btn-warning"
                style={{marginRight: '15px'}}                
                onClick={() => handleEditNote(note)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                  </svg>
              </button>          
              <button 
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveNote(note.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
              </button>  
            </div>
            
          </li>
        </CSSTransition>
        
      ))}      
    </TransitionGroup>
    {isModal && <Modal hideModal={() => setModal(false)} value={value} setValue={setValue} note={idNote}/>}
    </>
  )
}