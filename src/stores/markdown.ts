import { create } from 'zustand'

type State = {
  markdown: string
}

type Action = {
  updateMarkdown: (markdown: string) => void
}

export const useMarkdown = create<State & Action>((set) => {
  return {
    markdown: '',
    updateMarkdown: (markdown: string) => set({ markdown }),
  }
})
