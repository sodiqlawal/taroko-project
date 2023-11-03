import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/form/Button";

const defaultProps: {
    content: string;
    onClick: () => void;
    type: "submit" | "reset" | "button";
    disabled: boolean;
    loading: boolean
} = {
    content: "Submit",
    onClick: jest.fn(),
    type: "submit",
    disabled: false,
    loading: false
};

const setupButton = (props = defaultProps) => render(<Button {...props} />);

describe("The <SubmitButton /> component", () => {

    it("should match snapshot", () => {
        const { asFragment } = setupButton();

        expect(asFragment()).toMatchSnapshot()
    });

    it("should render the button and content", () => {
        setupButton();

        const content = screen.getByText(defaultProps.content);
        const loadingText = screen.queryByText(/loading.../);

        expect(content).toBeInTheDocument();
        expect(loadingText).not.toBeInTheDocument();
    });

    it("should call the click handler", () => {
        setupButton();

        const button = screen.getByRole("button", { name: /Submit/i });

        fireEvent.click(button);

        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it("should disable button if disabled is true", () => {
        defaultProps.disabled = true;
        setupButton();

        const button = screen.getByRole("button", { name: /Submit/i });

        expect(button).toBeDisabled();
    });

    it("should display `loading...` if loading is true", () => {
        defaultProps.loading = true;
        setupButton();

        const loadingText = screen.getByText(/loading.../);

        expect(loadingText).toBeInTheDocument();
    });
});
