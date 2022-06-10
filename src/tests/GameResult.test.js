import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'
import { CustomNav } from "../components/CustomNav"
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

test('not friends and logout when not logged in', () => {

  render(
    <BrowserRouter>
      <CustomNav notifications={[]} />
    </BrowserRouter>
  )
  screen.getByText('AirChess')
  screen.getByText('Ranking')
  screen.getByText('🔔0')
  screen.getByText('⚙️')
  screen.getByText('CustomNav.login')
  screen.getByText('CustomNav.register')
  expect(
    screen.queryByText('CustomNav.friends')
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText('CustomNav.logout')
  ).not.toBeInTheDocument();

})

test('friends and logout when logged in', () => {

  render(
    <BrowserRouter>
      <CustomNav notifications={[]} user={{ info: { username: "testUsername" } }} />
    </BrowserRouter>
  )
  screen.getByText('AirChess')
  screen.getByText('Ranking')
  screen.getByText('🔔0')
  screen.getByText('⚙️')

  screen.getByText('CustomNav.friends')

  screen.getByText('CustomNav.logout')

})