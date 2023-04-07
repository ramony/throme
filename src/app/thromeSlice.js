import { createSlice } from '@reduxjs/toolkit'

const mergeData = (state, result) => {
  if (result.listFlag) {
    let { listingData, listingNext } = result
    listingData = [...state.listingData, ...listingData]
    return { listingData, listingNext }
  } else {
    let { contentData } = result
    contentData = [...state.contentData, ...contentData]
    return { contentData }
  }
}

const buildData = (result) => {
  if (result.listFlag) {
    let { listingData, listingNext } = result
    return { listingData, listingNext, contentData: [] }
  } else {
    return result;
  }
}

export const thromeSlice = createSlice({
  name: 'throme',
  initialState: {
    listingData: []
  },
  reducers: {
    handleData: (state, { payload }) => {
      let { result, append } = payload;
      let ret = append ? mergeData(state, result) : buildData(result);
      return ret;
    },
    handleLoading(state, status) {
      return state
    }
  }
})

export const { handleData, handleLoading } = thromeSlice.actions

export default thromeSlice.reducer