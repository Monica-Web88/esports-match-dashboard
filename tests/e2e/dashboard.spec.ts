import { test, expect } from "@playwright/test";

test.describe("Esports Match Analytics Dashboard", () => {
  test("renders the live scoreboard with both team names and the series score", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Phoenix Reign")).toBeVisible();
    await expect(page.getByText("Steel Vipers")).toBeVisible();
    await expect(page.locator(".score-num")).toContainText("2");
    await expect(page.locator(".score-num")).toContainText("1");
  });

  test("clicking a chart tab switches the active tab and updates the chart caption", async ({ page }) => {
    await page.goto("/");

    const goldTab = page.getByRole("tab", { name: "Gold diff" });
    const killsTab = page.getByRole("tab", { name: "Kill timeline" });

    await expect(goldTab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".chart-caption")).toContainText("Gold difference");

    await killsTab.click();

    await expect(killsTab).toHaveAttribute("aria-selected", "true");
    await expect(goldTab).toHaveAttribute("aria-selected", "false");
    await expect(page.locator(".chart-caption")).toContainText("Kills secured");
    // Chart.js should still have rendered a canvas after the swap.
    await expect(page.locator(".chart-wrap canvas")).toBeVisible();
  });

  test("theme toggle switches the page between dark and light mode", async ({ page }) => {
    await page.goto("/");

    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: "Toggle theme" }).click();
    await expect(html).toHaveAttribute("data-theme", "light");

    await page.getByRole("button", { name: "Toggle theme" }).click();
    await expect(html).toHaveAttribute("data-theme", "dark");
  });
});
