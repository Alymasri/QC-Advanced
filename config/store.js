import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// export const useRegisterStore = create((set) => ({
// 	pendingData: {},
// 	storePendingData: (data) => set({ pendingData: data }),
// 	clearPendingData: () => set({ pendingData: {} }),
// }));

export const useRegisterStore = create(
	persist(
		(set, get) => ({
			pendingData: {},
			storePendingData: (data) => set({ pendingData: data }),
			clearPendingData: () => set({ pendingData: {} }),
		}),
		{
			name: 'qc-forgot-password',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export const useForgotPasswordEmailStore = create(
	persist(
		(set, get) => ({
			pendingData: {},
			storePendingData: (data) => set({ pendingData: data }),
			clearPendingData: () => set({ pendingData: {} }),
		}),
		{
			name: 'qc-forgot-password',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

// export const useForgotPasswordEmailStore = create((set) => ({
// 	pendingData: {},
// 	storePendingData: (data) => set({ pendingData: data }),
// 	clearPendingData: () => set({ pendingData: {} }),
// }));
