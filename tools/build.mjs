import { readFileSync, writeFileSync } from "node:fs";
import { marked } from "marked";

const raw = readFileSync(new URL("../index.md", import.meta.url), "utf8");
const md = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
const title = (md.match(/^#\s+(.+)$/m) || [, "모두를 위한 철학"])[1];
const body = marked.parse(md, { gfm: true });

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  body { max-width: 860px; margin: 0 auto; padding: 48px 20px 80px; font-family: "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif; line-height: 1.75; color: #222; word-break: keep-all; }
  h1 { font-size: 2rem; line-height: 1.3; margin-bottom: .3em; }
  h2 { margin-top: 2.4em; padding-bottom: .3em; border-bottom: 1px solid #e5e5e5; }
  table { border-collapse: collapse; width: 100%; margin: 1.2em 0; font-size: .92rem; display: block; overflow-x: auto; }
  th, td { border: 1px solid #ddd; padding: 8px 10px; vertical-align: top; text-align: left; }
  th { background: #f6f6f4; }
  a { color: #2a5db0; }
</style>
</head>
<body>
${body}
</body>
</html>
`;

writeFileSync(new URL("../index.html", import.meta.url), html);
console.log("built index.html");
