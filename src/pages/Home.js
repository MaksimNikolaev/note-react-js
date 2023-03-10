import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Filter } from "../components/Filter"
import { Form } from "../components/Form"
import { Loader } from "../components/Loader"
import { Notes } from "../components/Notes"
import { Sort } from "../components/Sort"
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
      <div className="group-sort-filter">
        <Sort />
        <Filter />
      </div>      
      <hr/>
      {(status === 'loading') 
        ? <Loader/>
        : <Notes/>
      }     
    </Fragment>
  )
}