export function handleCaptureTime() {
  const now = new Date();

  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];

  console.log(date); // 2026-03-14
  console.log(time); // 10:32:21
}
