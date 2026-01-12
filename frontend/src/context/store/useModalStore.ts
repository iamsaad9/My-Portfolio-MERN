import {create} from 'zustand';

interface ModalState {
    isModalOpen: boolean;
    isUpdate: boolean;
    _id?: string;
    openModal: (update:boolean,_id?:string) => void;
    closeModal: () => void;
}  
 
const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    isUpdate: false,
    _id: '',
    openModal: (update:boolean,_id?:string) => set({ isModalOpen: true,isUpdate:update,_id:_id }),
    closeModal: () => set({ isModalOpen: false, isUpdate: false,_id: '' }),
}));

export default useModalStore;
