import { useEffect } from 'react'
import { type FromLanguage, type Languages } from '../types.d'

interface TranslateInput {
  fromLanguage: FromLanguage
  toLanguage: Languages
  text: string
  textResult: string
  setResult: (payload: string) => void
}

export const useTranslate = ({
  fromLanguage,
  toLanguage,
  text,
  setResult,
  textResult
}: TranslateInput) => {
  // API-translate Document/Dev/api-translate
  const fetchTranslateAPI = async () => {
    const res = await fetch('http://127.0.0.1:5000/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: (text.length > 0) ? text : ' ',
        source: fromLanguage,
        target: toLanguage,
        format: 'text',
        api_key: ''
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    try {
      if (res?.ok) {
        const data = await res.json()
        setResult(data.translatedText)
      } else {
        console.log(`HTTP Response Code: ${res?.status}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (text === '') return

    fetchTranslateAPI().catch(console.error)
  }, [fromLanguage, toLanguage, text, textResult])
}
