import { render, screen } from "@testing-library/react"
import Orders from "../pages/Orders"
import { BrowserRouter } from 'react-router-dom';

describe("Orders", () => {
    test("Orders", () => {
        render(
            <BrowserRouter>
                <Orders />
            </BrowserRouter>
        );
        const linkElement = screen.getAllByText(/User/i);
        expect(linkElement).toBeDefined();
    });
});