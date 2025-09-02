import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  it("renders with default (primary) variant", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-fuchsia-600");
    expect(button).toHaveTextContent("Click Me");
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: /secondary/i });

    expect(button).toHaveClass("bg-violet-700");
  });

  it("applies additional className", () => {
    render(<Button className="custom-class">Styled</Button>);
    const button = screen.getByRole("button", { name: /styled/i });

    expect(button).toHaveClass("custom-class");
  });

  it("handles click events", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Press</Button>);
    const button = screen.getByRole("button", { name: /press/i });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const button = screen.getByRole("button", { name: /disabled/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards refs to the underlying button", () => {
    const ref = {
      current: null,
    } as unknown as React.RefObject<HTMLButtonElement>;
    render(<Button ref={ref}>Ref Test</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
