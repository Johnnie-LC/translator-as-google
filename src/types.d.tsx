import { type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from './constants'

export type Languages = keyof typeof SUPPORTED_LANGUAGES
export type AutoLangauge = typeof AUTO_LANGUAGE
export type FromLanguage = Languages | AutoLangauge

export enum ActionTypes {
  InterchangeLanguage = 'INTERCHANGE_LANGUAGES',
  SetFromLanguage = 'SET_FROM_LANGUAGE',
  SetToLanguage = 'SET_TO_LANGUAGE',
  SetFromText = 'SET_FROM_TEXT',
  SetResult = 'SET_RESULT'
}

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Languages
  fromText: string
  result: string
  loading: boolean
}

export type Action =
| { type: ActionTypes.InterchangeLanguage }
| { type: ActionTypes.SetFromLanguage, payload: FromLanguage }
| { type: ActionTypes.SetToLanguage, payload: Languages }
| { type: ActionTypes.SetFromText, payload: string }
| { type: ActionTypes.SetResult, payload: string }

export enum SectionType {
  From = 'from',
  To = 'To'
}
