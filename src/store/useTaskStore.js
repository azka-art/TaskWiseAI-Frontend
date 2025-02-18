import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  setTasks: (newTasks) => set({ tasks: newTasks }),
}));

export default useTaskStore;
