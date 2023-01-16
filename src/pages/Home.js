import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form } from "../components/Form"
import { Loader } from "../components/Loader"
import { Notes } from "../components/Notes"
import { getNotes } from "../features/notes/notesSlice"

export const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.notes.status)


  useEffect(() => {
    dispatch(getNotes())
    //eslint-disable-next-line
  }, [])

  return (
    <Fragment>      
      <Form />
      <hr/>
      {(status === 'loading') 
        ? <Loader/>
        : <Notes/>
      }     
    </Fragment>
  )
}