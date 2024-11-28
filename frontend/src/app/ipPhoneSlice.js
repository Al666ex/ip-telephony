import { createSlice, current } from '@reduxjs/toolkit'

//Функция createSlice() генерирует редьюсер и действия к нему
export const ipPhoneSlice = createSlice({
  name: 'phones',
  initialState: {
    //columns - массив phones
    phones : [],
    searchPerson : '',
    searchRefresh : false,
    filter : 'Search',
    person : '',
    phone : {},
    editPersonPhone : {},
    findPerson : [],     
    checkBoxChangePersonData : false,
    showModal : false,
    personId : null,
    error : '',
    options : []   
  },
  reducers: {
    setPhones : (state,action) => {
      state.phones = action.payload
      if(state.searchRefresh){
        state.searchRefresh = false;        
        state.phones = action.payload
      }
    },
    setSearchPerson : (state,action) => {
      state.searchPerson = action.payload.toUpperCase();
    },
    setSearchRefresh : (state,action) => {
      //state.searchRefresh = !state.searchRefresh; // Переключаем состояние
      state.searchRefresh = action.payload;
    },
    setFilter : (state,action) => {
      state.filter = action.payload
    },
    setPerson : (state,action) => {
      state.person = action.payload
      // state.searchPerson = `${state.person.last_name} ${state.person.first_name}`
    },
    setPhone : (state,action) => {
      state.phone = action.payload;
    },
    setEditPersonPhone : (state,action) => {
      state.editPersonPhone = action.payload
    },
    setFindPerson : (state,action) => {
      state.findPerson = action.payload
    },
    setCheckBoxChangePersonData : (state,action) => {
      state.checkBoxChangePersonData = action.payload;
    },
    setShowModal : (state,action) => {
      state.showModal = action.payload
    },
    setPersonId : (state, action) => {
      state.personId = action.payload
    },
    setError : (state,action) => {
      state.error = action.payload
    },
    setOptions : (state,action) => {
      state.options = action.payload
    }

  }
})

export const {   
  setPhones,
  setSearchPerson,
  setSearchRefresh,
  setFilter,
  setPerson,
  setPhone,
  setEditPersonPhone,
  setFindPerson,   
  setCheckBoxChangePersonData,
  setShowModal,
  setPersonId,
  setError,
  setOptions
} = ipPhoneSlice.actions

export default ipPhoneSlice.reducer