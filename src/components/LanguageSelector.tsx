import Form from 'react-bootstrap/Form'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Languages } from '../types.d'

type Props =
| { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: SectionType.To, value: Languages, onChange: (language: Languages) => void }

export const LanguageSelector = ({ type, onChange, value }: Props) => {
  const handlerOnchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Languages)
  }

  return (
    <Form.Select aria-label="Selecciona el Idioma" onChange={handlerOnchange} value={value}>
      {
        type === SectionType.From && <option value={AUTO_LANGUAGE}>Auto</option>
      }
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
            <option key={key} value={key} >{literal}</option>
        ))
      }
    </Form.Select>
  )
}
