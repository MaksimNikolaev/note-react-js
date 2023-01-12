import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/constants";

const initialState = {
  notes: [],
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

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: {
    [getNotes.fulfilled]: (state, action) =>{
      state.notes = action.payload;
      state.status = 'success';
    },
    [getNotes.pending]: (state) =>{ 
      state.status = 'loading';
    },
    [getNotes.rejected]: (state) => {
      state.status = 'error';
    },
    [addNote.fulfilled]: (state, action) => {
      state.notes.push(action.payload);
      state.status = 'success';
    },
    [addNote.pending]: (state) => {
      state.status = 'init';
    },
    [addNote.rejected]: (state) => {
      state.status = 'error';
    },
    [removeNote.fulfilled]: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
      state.status = 'success';
    },
    [removeNote.pending]: (state) => {
      state.status = 'init';
    },
    [removeNote.rejected]: (state) => {
      state.status = 'error';
    },
  }
})

//const { onNoteRemove } = notesSlice.actions
export default notesSlice.reducer