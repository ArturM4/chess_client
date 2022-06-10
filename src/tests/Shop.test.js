import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { Shop } from "../pages/Shop"

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
    <Shop />
  )

  screen.getAllByText('Shop.try')
  screen.getAllByText('Shop.equip')


})