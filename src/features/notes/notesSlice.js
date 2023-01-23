import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/constants";

const initialState = {
  notes: [],
  filterNotesArr: null,
  status: 'init' | 'loading' | 'error' | 'success',
}

export const getNotes = createAsyncThunk('notes/getNotes', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${url}/notes.json`)
    const payload = Object.keys(res.data || {}).map(key => {
      return {
        ...res.data[key],
        id: key
        }
    })
    return payload
  } catch(e) {
    return rejectWithValue('Что-то пошло не так')
  }   
})

export const addNote = createAsyncThunk('notes/addNote', async (title, { rejectWithValue }) => {
  const note = {
    title, 
    date: new Date().toJSON()
  }
  try {
    const res = await axios.post(`${url}/notes.json`, note)    
    const payload = {
      ...note,
      id: res.data.name
    }
    return payload
  } catch (e) {
    return rejectWithValue('Что-то пошло не так')
  }
})

export const removeNote = createAsyncThunk('notes/removeNote', async(id, {rejectWithValue }) => {
  try {
    await axios.delete(`${url}/notes/${id}.json`);
    return id
  }
  catch (e) {
    return rejectWithValue('Что-то пошло не так')
  }    
})

export const editNote = createAsyncThunk('notes/editNote', async({id, title}, {rejectWithValue }) => {
  const note = {
    title, 
    date: new Date().toJSON()
  }
  try {
    await axios.put(`${url}/notes/${id}.json`, note);    
    const payload = {
      ...note,
      id,
    }
    return payload
  }
  catch (e) {
    return rejectWithValue('Что-то пошло не так')
  }    
})


export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    sortInAscending(state, action) {
      state.filterNotesArr
      ? state.filterNotesArr.sort((a, b) => a[action.payload] > b[action.payload] ? 1 : -1)
      : state.notes.sort((a, b) => a[action.payload] > b[action.payload] ? 1 : -1)
    },
    sortInDescending(state, action) {
      state.filterNotesArr
      ? state.filterNotesArr.sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1)
      : state.notes.sort((a, b) => a[action.payload] > b[action.payload] ? -1 : 1)
    },
    filterNotes(state, action) {
      state.filterNotesArr = state.notes.filter(note => note.title.toLowerCase().includes(action.payload.toLowerCase()))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase (getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.status = 'success';
      })
      .addCase (getNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase (getNotes.rejected, (state) => {
        state.status = 'error';
      })
      .addCase (addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.status = 'success';
      })
      .addCase (addNote.pending, (state) => {
        state.status = 'init';
      })
      .addCase (addNote.rejected, (state) => {
        state.status = 'error';
      })
      .addCase (removeNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload)
        state.status = 'success';
      })
      .addCase (removeNote.pending, (state) => {
        state.status = 'init';
      })
      .addCase (removeNote.rejected, (state) => {
        state.status = 'error';
      })
      .addCase (editNote.fulfilled, (state, action) => {
        state.notes.forEach(note => {
          if (note.id === action.payload.id) {
            note.date = action.payload.date  
            note.title = action.payload.title
            note.id = action.payload.id   
          }
        })
        state.status = 'success';
      })
      .addCase (editNote.pending, (state) => {
        state.status = 'init';
      })
      .addCase (editNote.rejected, (state) => {
        state.status = 'error';
      })
  }
})

export const { sortInAscending, sortInDescending, filterNotes } = notesSlice.actions
export default notesSlice.reducer