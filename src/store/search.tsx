import { create } from "zustand";

interface SearchStoreState {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const useSearchStore = create<SearchStoreState>((set) => ({
  searchTerm: "",
  setSearchTerm: (s: string) => set({ searchTerm: s }),
}));

export default useSearchStore;