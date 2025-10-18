export function createIndexHtml(calendarPaths: string[]): string {
  const indexHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>📅</title>
</head>
<body>
  <ul>${calendarPaths
    .map((p) => `<li><a href="${p}">${p}</a></li>`)
    .join('')}</ul>
</body>
</html>
  `;

  return indexHtml.trim();
}
