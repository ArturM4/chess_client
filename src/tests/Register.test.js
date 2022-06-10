import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from "react-router-dom"
import { Register } from '../pages/Register'
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