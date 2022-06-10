import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Friends } from "../pages/Friends"

test('renders content', () => {

  render(<Friends user={{ info: { id: 'testId' } }} />)

  screen.getByText('Friends.addNew')
  screen.getByText('Friends.friends')


})