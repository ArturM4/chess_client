import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from "react-router-dom"
import { Register } from '../pages/Register'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

test('renders content', () => {

  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  )

  screen.getByPlaceholderText('Login.username')
  screen.getByPlaceholderText('Login.password')
  screen.getByText('Login.username')
  screen.getByText('Login.password')
  screen.getByText('Login.register')

})