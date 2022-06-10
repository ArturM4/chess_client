import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Login } from "../pages/Login"
import { BrowserRouter } from "react-router-dom"

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