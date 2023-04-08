import { createSlice } from '@reduxjs/toolkit'

export const thromeSlice = createSlice({
  name: 'throme',
  initialState: {
    listingData: [],
    contentData: [],
  },
  reducers: {
    handleUrl: (state, { payload }) => {
      let { result, append } = payload;
      if (result.listFlag) {
        if (append) {
          state.listingData.push(...result.listingData);
        } else {
          state.listingData = [...result.listingData];
          state.contentData = []
        }
        state.listingNext = result.listingNext;
      } else {
        if (append) {
          state.contentData.push(...result.contentData)
        } else {
          state.contentData = [...result.contentData];
        }
      }
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