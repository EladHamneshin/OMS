import { render, screen } from "@testing-library/react"
import Home from "../pages/home"
import { BrowserRouter } from 'react-router-dom';

describe("Home", () => {
    test("home", () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        const linkElement = screen.getAllByText(/W/i);
        expect(linkElement).toBeDefined();
    });
});