import { render, screen } from "@testing-library/react"
import App from "../App"

describe("App", () => {
    test("first test", () => {
        render(App())
        const linkElement = screen.getByText(/Vite/i)
        expect(linkElement).toBeInTheDocument()
    })
})
