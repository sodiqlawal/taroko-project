import useModal from "@/hooks/useModal";
import { act, renderHook } from "@testing-library/react";


describe("The useModal hook", () => {
  it("should set `isOpen` to true if `open` is triggered ", () => {
    const { result } = renderHook(() => useModal(), {
      initialProps: {
        isOpen: false,
      },
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should set `isOpen` to false if `close` is triggered ", () => {
    const { result } = renderHook(() => useModal(), {
      initialProps: {
        isOpen: true,
      },
    });

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

});
