
// statisticsSlice içinden summary verisini almak için selector
export const selectSummary = (state) => state.statistics.summary;

// statisticsSlice içinden categories verisini almak için selector
export const selectCategories = (state) => state.statistics.categories;

// statisticsSlice içinden isStatisticsLoading verisini almak için selector
export const selectStatLoading = (state) =>
  state.statistics.isStatisticsLoading;

// statisticsSlice içinden isStatisticsError verisini almak için selector
export const selectStatError = (state) => state.statistics.isStatisticsError;
