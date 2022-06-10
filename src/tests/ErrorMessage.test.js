import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { ErrorMessage } from "../components/ErrorMessage"


test('renders msg', () => {

  render(
    <ErrorMessage msg={'testMsg'} />
  )
  screen.getByText('testMsg')


})

