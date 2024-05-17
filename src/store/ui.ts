import { AxiosError } from 'axios'
import { atom } from 'jotai'

export const errorState = atom<AxiosError | Error | string[]>([])
