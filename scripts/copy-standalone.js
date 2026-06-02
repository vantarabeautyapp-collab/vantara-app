/**
 * After `next build` with output:'standalone', copy static assets into
 * .next/standalone so node .next/standalone/server.js serves them correctly.
 * Railway runs this as part of the build step.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const standaloneDir = path.join(root, '.next', 'standalone')

if (!fs.existsSync(standaloneDir)) {
  console.log('[copy-standalone] .next/standalone not found — skipping (not a standalone build).')
  process.exit(0)
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(s, d)
    } else {
      fs.copyFileSync(s, d)
    }
  }
}

// Copy public/ → .next/standalone/public/
copyDir(path.join(root, 'public'), path.join(standaloneDir, 'public'))
console.log('[copy-standalone] ✓ Copied public/')

// Copy .next/static/ → .next/standalone/.next/static/
copyDir(
  path.join(root, '.next', 'static'),
  path.join(standaloneDir, '.next', 'static')
)
console.log('[copy-standalone] ✓ Copied .next/static/')

console.log('[copy-standalone] Done — standalone bundle ready for Railway.')
