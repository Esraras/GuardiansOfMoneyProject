import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isEditId: "",
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  selectors: {
    selectIsEditModalOpen: (state) => state.isEditModalOpen,
    selectIsAddModalOpen: (state) => state.isAddModalOpen,
    selectIsEditID: (state) => state.isEditId,
  },
  reducers: {
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state = initialState;
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
      state = initialState;
    },
    addEditId: (state, { payload }) => {
      state.isEditId = payload;
    },
  },
});

export const modalsReducer = modalsSlice.reducer;
export const {
  openEditModal,
  closeEditModal,
  openAddModal,
  closeAddModal,
  addEditId,
} = modalsSlice.actions;
export const { selectIsEditModalOpen, selectIsAddModalOpen, selectIsEditID } =
  modalsSlice.selectors;
