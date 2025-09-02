import { SelectOption } from "@/types/option";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  const options: SelectOption[] = [
    { id: 1, value: "Option A" },
    { id: 2, value: "Option B" },
    { id: 3, value: "Option C" },
  ];

  it("renders placeholder text when no value is selected", () => {
    render(
      <Dropdown options={options} onChange={jest.fn()} placeholder="Pick one" />
    );
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(
      <Dropdown label="My Label" options={options} onChange={jest.fn()} />
    );
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("shows selected option when value is set", () => {
    render(<Dropdown options={options} value={2} onChange={jest.fn()} />);
    expect(screen.getByText("Option B")).toBeInTheDocument();
  });

  it("opens dropdown when button is clicked", async () => {
    render(<Dropdown options={options} onChange={jest.fn()} />);
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", async () => {
    render(
      <div>
        <Dropdown options={options} onChange={jest.fn()} />
        <span data-testid="outside">Outside</span>
      </div>
    );
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("outside"));
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("filters options based on search input", async () => {
    render(<Dropdown options={options} onChange={jest.fn()} />);
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);

    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "B");

    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.queryByText("Option A")).not.toBeInTheDocument();
  });

  it("calls onChange and closes dropdown when option is clicked", async () => {
    const handleChange = jest.fn();
    render(<Dropdown options={options} onChange={handleChange} />);
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);

    const option = screen.getByText("Option C");
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith({ id: 3, value: "Option C" });
    expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
  });

  it("shows 'No results found' when search yields no matches", async () => {
    render(<Dropdown options={options} onChange={jest.fn()} />);
    const trigger = screen.getByRole("button");
    await userEvent.click(trigger);

    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "XYZ");

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("displays 'Invalid option' if value does not exist in options", () => {
    render(<Dropdown options={options} value={999} onChange={jest.fn()} />);
    expect(screen.getByText("Invalid option")).toBeInTheDocument();
  });
});
