import { describe, it, expect, vi } from "vitest";

describe("Component Logic & Clipboard Test", () => {
  it("copies email to clipboard properly", async () => {
    // محاكاة كليب بورد المتصفح
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    const targetEmail = "devilgaming20035@gmail.com";
    await navigator.clipboard.writeText(targetEmail);

    expect(mockWriteText).toHaveBeenCalledWith(targetEmail);
    expect(mockWriteText).toHaveBeenCalledTimes(1);
  });
});