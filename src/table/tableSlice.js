import { createSlice } from '@reduxjs/toolkit';

export const tableSlice = createSlice({
    name: 'table',
    initialState: {
      value: []
    },
    reducers: {
      
        setData: (state, action) => {
        state.value = action.payload;
      },
    },
  });


const setData = tableSlice.actions;


export const setTableData = country => dispatch => {

  fetch("https://disease.sh/v3/covid-19/jhucsse")
  .then(response => response.json())
  .then(response =>{
    var provinces = response.filter(ref => {
      return ref.country === country
    })
    console.log(provinces)
    dispatch(setData(provinces))
  })

}

export const selectTableData = state => state.table.value;