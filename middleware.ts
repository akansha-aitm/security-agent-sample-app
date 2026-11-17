// PLANTED (high): a security switch readable in the browser
export function isDemo() {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}
