import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToastContext, ToastProp } from "@/context/ToastContext";
import { TOAST_OPTION } from "@/constant";

const TOAST_DEFAULT_INFO = {
    isOpen: false,
    type: TOAST_OPTION.ERROR,
    message: "",
};

const TOAST_SUCCESS_INFO = {
    isOpen: true,
    type: TOAST_OPTION.SUCCESS,
    message: "success message",
};

const TOAST_ERROR_INFO = {
    isOpen: true,
    type: TOAST_OPTION.ERROR,
    message: "error message",
};

function TestComponent() {
    const [toast, setToast] = useState<ToastProp>(TOAST_DEFAULT_INFO);

    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {toast.isOpen ? (
                <div data-testid="toast">
                    <div data-testid="type">{toast.type}</div>
                    <div data-testid="message">{toast.message}</div>{" "}
                </div>
            ) : null}
            <button type="button" onClick={() => setToast(TOAST_SUCCESS_INFO)}>Open success toast</button>
            <button type="button" onClick={() => setToast(TOAST_ERROR_INFO)}>Open error toast</button>
        </ToastContext.Provider>
    );
}

const setup = () => render(<TestComponent />);

describe("The <AppContext /> component", () => {
    it("should not open toast by default", async () => {
        setup();

        const toast = screen.queryByTestId(/toast/);

        expect(toast).not.toBeInTheDocument();
    });

    it("should open success toast", async () => {
        setup();

        
        const button = screen.getByRole("button", { name: /Open success toast/ });
        
        
        fireEvent.click(button);
        
        await waitFor(() => {
            const toast = screen.getByTestId(/toast/);
            expect(toast).toBeInTheDocument();
        });

        const type = screen.getByTestId(/type/);
        const message = screen.getByTestId(/message/);
        expect(type).toHaveTextContent(TOAST_SUCCESS_INFO.type);
        expect(message).toHaveTextContent(TOAST_SUCCESS_INFO.message);

    });

    it("should open error toast", async () => {
        setup();

        const button = screen.getByRole("button", { name: /Open error toast/ });
        
        fireEvent.click(button);
        
        await waitFor(() => {
            const toast = screen.getByTestId(/toast/);
            
            expect(toast).toBeInTheDocument();
        });
        
        const type = screen.getByTestId(/type/);
        const message = screen.getByTestId(/message/);
        expect(type).toHaveTextContent(TOAST_ERROR_INFO.type);
        expect(message).toHaveTextContent(TOAST_ERROR_INFO.message);
    });

});
