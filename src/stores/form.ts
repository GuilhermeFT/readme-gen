import { create } from 'zustand'

type State = {
  license: string
}

type Action = {
  setLicense: (license: string) => void
}

export const useFormStore = create<State & Action>((set) => {
  return {
    license: 'mit',
    setLicense: (license: string) => set({ license }),
  }
})
