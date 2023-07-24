import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('Translate app works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)
  const textAreaFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textAreaFrom, 'Hola hermoso mundo')
  const result = await app.findByDisplayValue(/Hello beautiful world/i, {}, { timeout: 2000 })

  expect(result).toBeTruthy()
})