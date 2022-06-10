import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Login } from "../pages/Login"
import { BrowserRouter } from "react-router-dom"

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
      <Login />
    </BrowserRouter>
  )

  screen.getByPlaceholderText('Login.username')
  screen.getByPlaceholderText('Login.password')
  screen.getByText('Login.username')
  screen.getByText('Login.password')
  screen.getByText('Login.login')

})