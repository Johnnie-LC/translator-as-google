import { useReducer } from 'react'
import { type Action, ActionTypes, type State, type Languages, type FromLanguage } from '../types.d'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

const reducer = (state: State, action: Action) => {
  if (action.type === ActionTypes.InterchangeLanguage) {
    if (state.fromLanguage === 'auto') return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result
    }
  }

  if (action.type === ActionTypes.SetFromLanguage) {
    if (state.fromLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (action.type === ActionTypes.SetToLanguage) {
    if (state.toLanguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (action.type === ActionTypes.SetFromText) {
    const loading = action.payload === ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (action.type === ActionTypes.SetResult) {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export const useStore = () => {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: ActionTypes.SetFromLanguage, payload })
  }

  const setToLanguage = (payload: Languages) => {
    dispatch({ type: ActionTypes.SetToLanguage, payload })
  }

  const setFromtext = (payload: string) => {
    dispatch({ type: ActionTypes.SetFromText, payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: ActionTypes.SetResult, payload })
  }

  const setInterchangeLanguage = () => {
    dispatch({ type: ActionTypes.InterchangeLanguage })
  }

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    setFromtext,
    setResult,
    setInterchangeLanguage
  }
}
