import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Ranking } from "../pages/Ranking"

test('renders content', () => {

  render(<Ranking />)

  screen.getByText('Ranking')
  screen.getByText('Elo')


})