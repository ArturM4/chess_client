import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Shop } from "../pages/Shop"

test('renders content', () => {

  render(
    <Shop />
  )

  screen.getAllByText('Shop.try')
  screen.getAllByText('Shop.equip')


})