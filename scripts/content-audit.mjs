import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const errors = [];

function checkFileContains(filePath, pattern, description) {
  const fullPath = path.join(rootDir, filePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`File missing: ${filePath}`);
    return false;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const matched = typeof pattern === 'string' ? content.includes(pattern) : pattern.test(content);
  if (!matched) {
    errors.push(`Audit Failed: ${description} in ${filePath}`);
    return false;
  }
  return true;
}

function scanFiles(dir, exts = ['.ts', '.tsx', '.mjs', '.js']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== 'out' && file !== '.git') {
        results = results.concat(scanFiles(fullPath, exts));
      }
    } else {
      const ext = path.extname(file);
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

console.log('=== SYNEX V1 P0 CONTENT AUDIT STARTING ===');

// 1. Verify ACT_LABELS match in Header and TraceRail
const headerPath = path.join(rootDir, 'components/marketing/Header.tsx');
const traceRailPath = path.join(rootDir, 'components/trace/TraceRail.tsx');

if (fs.existsSync(headerPath)) {
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  if (!headerContent.includes('ACT_LABELS') && !headerContent.includes('ACT_NAV_ITEMS')) {
    errors.push('Header.tsx must import ACT_LABELS or ACT_NAV_ITEMS from @/lib/content-contract');
  }
} else {
  errors.push('Missing components/marketing/Header.tsx');
}

if (fs.existsSync(traceRailPath)) {
  const railContent = fs.readFileSync(traceRailPath, 'utf8');
  if (!railContent.includes('ACT_LABELS') && !railContent.includes('ACT_NAV_ITEMS')) {
    errors.push('TraceRail.tsx must import ACT_LABELS or ACT_NAV_ITEMS from @/lib/content-contract');
  }
} else {
  errors.push('Missing components/trace/TraceRail.tsx');
}

// 2. Verify Hero contains DEMO_NOTICE and exact HERO_COPY.h1
const heroPath = path.join(rootDir, 'components/trace/Act0Hero.tsx');
if (fs.existsSync(heroPath)) {
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  if (!heroContent.includes('DEMO_NOTICE')) {
    errors.push('Act0Hero.tsx must import and render DEMO_NOTICE from @/lib/content-contract');
  }
  if (!heroContent.includes('HERO_COPY') || !heroContent.includes('HERO_COPY.h1')) {
    errors.push('Act0Hero.tsx must import and render HERO_COPY.h1 from @/lib/content-contract');
  }
} else {
  errors.push('Missing components/trace/Act0Hero.tsx');
}

// 2b. Verify Footer contains measured weight and planned tags
const footerPath = path.join(rootDir, 'components/marketing/Footer.tsx');
if (fs.existsSync(footerPath)) {
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  if (!footerContent.includes('Page weight: 159 KB HTML · 110 KB First Load JS')) {
    errors.push('Footer.tsx must display exact measured page weight: "Page weight: 159 KB HTML · 110 KB First Load JS"');
  }
  if (!footerContent.includes('Ed25519 Hardware HSM (Planned)')) {
    errors.push('Footer.tsx must tag Ed25519 Hardware HSM as (Planned)');
  }
  if (!footerContent.includes('Indian MSME Initiative (Planned)')) {
    errors.push('Footer.tsx must tag Indian MSME Initiative as (Planned)');
  }
} else {
  errors.push('Missing components/marketing/Footer.tsx');
}

// 2c. Verify Integration Status table exists in Act10Sovereignty.tsx
const act10Path = path.join(rootDir, 'components/trace/Act10Sovereignty.tsx');
if (fs.existsSync(act10Path)) {
  const act10Content = fs.readFileSync(act10Path, 'utf8');
  if (!act10Content.includes('INTEGRATION_STATUS')) {
    errors.push('Act10Sovereignty.tsx must import and render INTEGRATION_STATUS from @/lib/content-contract');
  }
} else {
  errors.push('Missing components/trace/Act10Sovereignty.tsx');
}

// 3. Scan codebase for forbidden patterns
const targetDirs = ['app', 'components', 'lib'].map((d) => path.join(rootDir, d));
const scannedFiles = targetDirs.flatMap((dir) => (fs.existsSync(dir) ? scanFiles(dir) : []));

scannedFiles.forEach((file) => {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, lineNum) => {
    // 3a. "100% complete"
    if (line.includes('100% complete')) {
      errors.push(`Forbidden string "100% complete" found at ${relPath}:${lineNum + 1}`);
    }

    // 3b. "text-embedding-3-large"
    if (line.includes('text-embedding-3-large')) {
      errors.push(`Forbidden OpenAI model "text-embedding-3-large" found at ${relPath}:${lineNum + 1}`);
    }

    // 3c. "postgres" (case-insensitive, allow only in changelog for historical note)
    if (/postgres/i.test(line) && !relPath.includes('changelog')) {
      errors.push(`Forbidden string "postgres" found at ${relPath}:${lineNum + 1}`);
    }

    // 3d. "whatsapp" (allow only in limits, changelog, content-contract, and Act10 integration table)
    if (
      /whatsapp/i.test(line) &&
      !relPath.includes('limits') &&
      !relPath.includes('changelog') &&
      !relPath.includes('content-contract') &&
      !relPath.includes('Act10Sovereignty')
    ) {
      errors.push(`Forbidden string "whatsapp" outside limits/changelog/contract/Act10 found at ${relPath}:${lineNum + 1}`);
    }

    // 3e. "air-gapped" (allow only in limits, docs glossary, and content-contract)
    if (
      /air-gapped/i.test(line) &&
      !relPath.includes('limits') &&
      !relPath.includes('docs') &&
      !relPath.includes('content-contract') &&
      !relPath.includes('changelog')
    ) {
      errors.push(`Forbidden string "air-gapped" outside limits/docs/contract found at ${relPath}:${lineNum + 1}`);
    }

    // 3f. Literal database passwords (e.g., MYSQL_PASSWORD=secret or PASSWORD=secret)
    if (
      /MYSQL_PASSWORD\s*=\s*(?!['"]?\$\{)[a-zA-Z0-9_-]+/i.test(line) ||
      /MYSQL_ROOT_PASSWORD\s*=\s*(?!['"]?\$\{)[a-zA-Z0-9_-]+/i.test(line) ||
      /PASSWORD\s*=\s*(?!['"]?\$\{)(?:secret|root|admin|password|fake\d*)/i.test(line)
    ) {
      errors.push(`Literal password detected at ${relPath}:${lineNum + 1}: ${line.trim()}`);
    }

    // 3g. Act 8 "30 DAYS" header/footer forbidden
    if (relPath.includes('Act8Measure') && /(?:Total\s*\(\s*30\s*Days\s*\)|Simulated Pilot Tenant\s*·\s*30\s*Days)/i.test(line)) {
      errors.push(`Forbidden "30 DAYS" sample label found in ${relPath}:${lineNum + 1}`);
    }

    // 3i. Page weight claim checks
    if (
      /Page weight\s*[<~]/i.test(line) &&
      !line.includes('159 KB HTML') &&
      !relPath.includes('content-audit')
    ) {
      errors.push(`Unmeasured page weight claim detected at ${relPath}:${lineNum + 1}: ${line.trim()}`);
    }

    // 4. ₹2,84,000 must only appear with permitted label context
    if (line.includes('2,84,000') || line.includes('₹2,84,000')) {
      // Allowed in content-contract.ts, content-audit.mjs, CONTENT-GUIDE.md
      if (
        !relPath.includes('content-contract') &&
        !relPath.includes('content-audit') &&
        !relPath.includes('CONTENT-GUIDE')
      ) {
        const hasAllowedContext =
          /list value before discount/i.test(line) ||
          /potential order value lost/i.test(line) ||
          line.includes('MONEY.labels.heroList') ||
          line.includes('MONEY.labels.counterfactualLost') ||
          line.includes('MONEY.listValue') ||
          line.includes('MONEY.lostValue') ||
          line.includes('listValue') ||
          line.includes('lostValue');

        if (!hasAllowedContext) {
          errors.push(
            `Amount ₹2,84,000 missing required label context ("List value before discount" or "Potential order value lost") at ${relPath}:${lineNum + 1}: ${line.trim()}`
          );
        }
      }
    }
  });
});

if (errors.length > 0) {
  console.error('\n❌ CONTENT AUDIT FAILED WITH ERRORS:');
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log('\n✅ ALL CONTENT CONTRACT INVARIANTS VERIFIED CLEAN.');
  process.exit(0);
}
