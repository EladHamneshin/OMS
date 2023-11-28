import { render, screen } from "@testing-library/react"
import SignIn from "../pages/SignIn"
import { BrowserRouter } from 'react-router-dom';

describe("SignIn", () => {
    test("SignIn", () => {
        render(
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        );
        const linkElement = screen.getByText(/SIGN IN/i);
        expect(linkElement).toBeInTheDocument();
    });
});