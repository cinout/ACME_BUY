import api from "@/utils/api";
import { CategoryEntity } from "@/utils/entities";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
export interface FormNewCategoryProps {
  name: string;
  image: File | string | null;
}

export const categoryAdd = createAsyncThunk<unknown, FormNewCategoryProps>(
  "category/categoryAdd",
  async (info, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", info.name);
      formData.append("image", info.image!);

      const result = await api.post("admin/category/category-add", formData);
      return thunkAPI.fulfillWithValue(result.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(
        ((e as AxiosError).response?.data as { error: string }).error
      );
    }
  }
);

interface CategoryState {
  categories: CategoryEntity[];
  showLoader: boolean;
}

const initialState: CategoryState = {
  categories: [], // TODO: should be hydrated when visit category page
  showLoader: false,
};

const categoryReducer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(categoryAdd.rejected, (state, action) => {
        // TODO: what to do when rejected?
        state.showLoader = false;
      })
      .addCase(categoryAdd.fulfilled, (state, action) => {
        state.showLoader = false;
        state.categories = [
          ...state.categories,
          (action.payload as { category: CategoryEntity }).category,
        ];
      });
  },
});

// export const {} = categoryReducer.actions;
export default categoryReducer.reducer;
