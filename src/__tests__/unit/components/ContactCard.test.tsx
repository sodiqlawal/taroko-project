import { fireEvent, render, screen } from "@testing-library/react";
import ContactCard from "@/components/contact-list/ContactCard";


const defaultProps = {
    contact: {
        first_name: "Sodiq",
        last_name: "Lawal",
        job: "Software Engineer",
        description: "Tech savvy with business acument"
    },
    refetch: jest.fn
};


const setupContactCard = (props = defaultProps) =>
    render(
        <ContactCard {...props} />
    );

describe("The <ContactCard /> component", () => {
    it("should match snapshot", () => {
        const { asFragment } = setupContactCard();

        expect(asFragment()).toMatchSnapshot()
    });

    it("should display contact data", () => {
        setupContactCard();

        const {first_name, last_name, job, description} = defaultProps.contact;

        expect(screen.getByText(`${first_name} ${last_name}`)).toBeInTheDocument();
        expect(screen.getByText(job)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
    });

    it("should not show delete alert modal on mount", () => {
        setupContactCard();

        expect(screen.queryByTestId(/modal/)).not.toBeInTheDocument();
    });

    it("should show delete alert modal on clicking delete button", () => {
        setupContactCard();

        const deleteBtn = screen.getByRole("button", { name: /Delete/i });

        fireEvent.click(deleteBtn)

        expect(screen.getByTestId(/modal/)).toBeInTheDocument();
    });

    it("should hide delete alert modal on clicking `No` on the modal", () => {
        setupContactCard();

        const deleteBtn = screen.getByRole("button", { name: /Delete/i });
        
        fireEvent.click(deleteBtn);
        
        const noBtn = screen.getByRole("button", { name: /No/i });
        
        fireEvent.click(noBtn)


        expect(screen.queryByTestId(/modal/)).not.toBeInTheDocument();
    });

});
