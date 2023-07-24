import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { type CSSProperties } from 'react'

interface Props {
  loading?: boolean
  onChange: (value: string) => void
  value: string
  type: SectionType
}

const commonStyles: CSSProperties = {
  height: '200px',
  border: 0,
  resize: 'none'
}

const getPLaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'

  return 'Traduccion'
}

export const Textarea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
        <Form.Control
            as='textarea'
            placeholder={getPLaceholder({ type, loading })}
            disabled={type === SectionType.To }
            autoFocus={type === SectionType.From}
            style={styles}
            value={value}
            onChange={handleChange}
          />
  )
}
