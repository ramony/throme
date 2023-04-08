import { createSlice } from '@reduxjs/toolkit'

const mergeData = (state, result) => {
  if (result.listFlag) {
    state.listingData.push(...result.listingData);
    state.listingNext = result.listingNext;
  } else {
    state.contentData.push(...result.contentData)
  }
}

const buildData = (state, result) => {
  if (result.listFlag) {
    state.listingData = [...result.listingData];
    state.listingNext = result.listingNext;
    state.contentData = []
  } else {
    state.contentData = [...result.contentData];
  }
}

export const thromeSlice = createSlice({
  name: 'throme',
  initialState: {
    listingData: [],
    contentData: [],
  },
  reducers: {
    handleUrl: (state, { payload }) => {
      let { result, append } = payload;
      append ? mergeData(state, result) : buildData(state, result);
    },
    handleLoading(state, { payload }) {
      state.loading = payload;
    },
    closeContent(state, { payload }) {
      state.contentData.splice(payload, 1)
    },
    setAutoDisplay(state, { payload }) {
      state.autoDisplay = payload;
    }
  }
})

export const { handleUrl, handleLoading, closeContent, setAutoDisplay } = thromeSlice.actions

export default thromeSlice.reducer