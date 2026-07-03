import { chromium } from "playwright";
import { existsSync } from "node:fs";
import { mkdir, readdir } from "node:fs/promises";
import { resolve, basename, extname } from "node:path";
import { pathToFileURL } from "node:url";

const htmlDir = resolve("reports/html");
const pdfDir = resolve("reports/pdf");

await mkdir(pdfDir, { recursive: true });

const files = (await readdir(htmlDir)).filter((file) => file.endsWith(".html"));

if (!files.length) {
  console.log("No HTML reports found.");
  process.exit(0);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

for (const file of files) {
  const name = basename(file, extname(file));
  const inputPath = resolve(htmlDir, file);
  const outputPath = resolve(pdfDir, `${name}.pdf`);

  if (existsSync(outputPath)) {
    console.log(`Skip existing PDF: ${outputPath}`);
    continue;
  }

  await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle" });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "14mm",
      right: "12mm",
      bottom: "14mm",
      left: "12mm",
    },
  });
  console.log(`Generated PDF: ${outputPath}`);
}

await browser.close();
