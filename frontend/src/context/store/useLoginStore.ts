import {create} from 'zustand';

interface LoginStore{
    isLogin: boolean;
    showlogin: (state: boolean) => void;
}


const useLoginStore = create<LoginStore>((set) => ({
    isLogin: false,
    showlogin: (value) => set({ isLogin: value }),
}));

export default useLoginStore;