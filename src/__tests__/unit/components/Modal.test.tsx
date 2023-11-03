import { render, screen } from "@testing-library/react";
import Modal from "@/components/modals/Modal";
import { ModalController } from "@/hooks/useModal";

interface DefaultPropsType {
    controller: ModalController;
}

const defaultProps: DefaultPropsType = {
    controller: {
        open: jest.fn,
        isOpen: false,
        close: jest.fn,
        toggle: jest.fn,
        modalData: null,
    },
};

const setupModal = (props = defaultProps) =>
    render(
        <Modal {...props} />
    );

describe("The <Modal /> component", () => {
    it("should match snapshot", () => {
        const { asFragment } = setupModal();

        expect(asFragment()).toMatchSnapshot()
    });

    it("should not render modal if isOpen is false", async () => {
        setupModal();

        expect(screen.queryByText("modal")).not.toBeInTheDocument();
    });

    it("should render modal if isOpen is true", async () => {
        defaultProps.controller.isOpen = true;

        setupModal();

        expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
});
