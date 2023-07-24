import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { Textarea } from './components/TextArea'
// import { useEffect } from 'react'
import { useTranslate } from './hooks/useTranslate'
import { useDebounce } from './hooks/useDebounce'
import { VOICE_FOR_LANGUAGE } from './constants'

function App () {
  const {
    loading,
    fromText,
    result,
    fromLanguage,
    toLanguage,
    setFromtext,
    setResult,
    setInterchangeLanguage,
    setFromLanguage,
    setToLanguage
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 500)

  const handleClipBoard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterrance = new SpeechSynthesisUtterance(result)
    utterrance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterrance)
  }

  useTranslate({
    fromLanguage,
    toLanguage,
    text: debouncedFromText,
    textResult: result,
    setResult
  })

  return (
    <Container fluid>
      <h2>Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <Textarea
            type={SectionType.From}
            value={fromText}
            onChange={setFromtext}
          />
          </Stack>
        </Col>

        <Col>
          <Button
            variant="link"
            disabled={fromLanguage === 'auto'}
            onClick={() => { setInterchangeLanguage() }}>
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <Textarea
              type={SectionType.To}
              onChange={setResult}
              loading={loading}
              value={result}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}>
                <Button
                variant='link'
                onClick={handleClipBoard}>
                  <ClipboardIcon />
                </Button>
                <Button
                variant='link'
                onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
