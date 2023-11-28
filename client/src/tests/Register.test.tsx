import { render, screen } from "@testing-library/react"
import Register from "../pages/Register"
import { BrowserRouter } from 'react-router-dom';

describe("Register", () => {
    test("Register", () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const linkElement = screen.getAllByText(/Register/i);
        expect(linkElement).toBeDefined();
    });
});