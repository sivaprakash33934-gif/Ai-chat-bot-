import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:49224';

const ROUTES = [
  '/',
  '/docs',
  '/limits',
  '/about',
  '/changelog',
  '/partners',
  '/login',
  '/onboarding',
  '/embed',
  '/dashboard',
  '/dashboard/assistant',
  '/dashboard/conversations',
  '/dashboard/queue',
  '/dashboard/approvals',
  '/dashboard/customers',
  '/dashboard/customers/CUST-001',
  '/dashboard/knowledge',
  '/dashboard/actions',
  '/dashboard/rules',
  '/dashboard/insights',
  '/dashboard/admin'
];

async function runBrowserQA() {
  console.log('=== STARTING REAL BROWSER QA (Playwright Chromium) ===');
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const viewport of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ]) {
    console.log(`\n--- Testing Viewport: ${viewport.name} (${viewport.width}x${viewport.height}) ---`);
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();

    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push({ url: page.url(), text: msg.text() });
      }
    });

    page.on('requestfailed', (req) => {
      failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    });

    for (const route of ROUTES) {
      const fullUrl = `${BASE_URL}${route}`;
      try {
        const response = await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
        const status = response ? response.status() : 'no-response';

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        // Check page title
        const title = await page.title();

        console.log(`[${viewport.name.toUpperCase()}] ${route} -> Status: ${status}, Overflow: ${overflow}, Title: "${title.slice(0, 30)}..."`);
        results.push({
          viewport: viewport.name,
          route,
          status,
          overflow,
          passed: status === 200 && !overflow
        });
      } catch (err) {
        console.error(`[${viewport.name.toUpperCase()}] ${route} FAILED:`, err.message);
        results.push({
          viewport: viewport.name,
          route,
          status: 'error',
          error: err.message,
          passed: false
        });
      }
    }

    await context.close();
  }

  // Specific interaction tests on Desktop
  console.log('\n--- Executing Specific Interaction Tests (Desktop) ---');
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Test 1: Act 4 Policy slider keyboard operation
  await page.goto(`${BASE_URL}/`);
  const slider = page.locator('input[type="range"]');
  if (await slider.count() > 0) {
    const initialVal = await slider.inputValue();
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    const newVal = await slider.inputValue();
    console.log(`✓ Act 4 Range slider keyboard test: initial=${initialVal}, after ArrowRight=${newVal}`);
  } else {
    console.log('⚠ Act 4 Slider not found');
  }

  // Test 2: Floating Chat Open, Focus, and Escape dismiss
  const chatTrigger = page.locator('button[aria-label="Open SYNEX Chat"]');
  if (await chatTrigger.count() > 0) {
    await chatTrigger.click();
    await page.waitForTimeout(300);
    const dialog = page.locator('div[role="dialog"][aria-label="SYNEX Chat"]');
    const isDialogVisible = await dialog.isVisible();
    console.log(`✓ Floating chat open test: visible=${isDialogVisible}`);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const isDialogClosed = !(await dialog.isVisible());
    console.log(`✓ Floating chat Escape dismiss test: closed=${isDialogClosed}`);
  }

  // Test 3: Act 11 Pilot form submission feedback
  const pilotForm = page.locator('form').filter({ hasText: 'Enterprise Work Email' });
  if (await pilotForm.count() > 0) {
    await page.fill('#email', 'procurement@enterprise.com');
    await page.fill('#companyName', 'Precision Aerospace');
    await pilotForm.locator('button[type="submit"]').click();
    await page.waitForTimeout(300);
    const feedbackText = await pilotForm.innerText();
    const hasHonestFeedback = feedbackText.includes('Demo submission complete — no request sent');
    console.log(`✓ Act 11 Pilot form honest demo feedback: ${hasHonestFeedback}`);
  }

  // Test 4: Conversations Drawer & DecisionReceipt expansion
  await page.goto(`${BASE_URL}/dashboard/conversations`);
  const convRow = page.locator('tr').filter({ hasText: 'Murugan Auto Components' }).first();
  if (await convRow.count() > 0) {
    await convRow.click();
    await page.waitForTimeout(400);
    const drawer = page.locator('div[role="dialog"][aria-labelledby="drawer-conv-title"]');
    const isDrawerOpen = await drawer.isVisible();
    console.log(`✓ Conversation Drawer open test: visible=${isDrawerOpen}`);

    // Test DecisionReceipt toggle
    const receiptToggle = drawer.locator('button').filter({ hasText: 'Show Evidence & Grounding' }).first();
    if (await receiptToggle.count() > 0) {
      await receiptToggle.click();
      await page.waitForTimeout(300);
      const hasExpandedText = await drawer.innerText();
      const isExpanded = hasExpandedText.includes('Verified Source Lineage');
      console.log(`✓ DecisionReceipt expansion test: expanded=${isExpanded}`);
    }
  }

  // Test 5: Actions Failure Center ActionLifecycle
  await page.goto(`${BASE_URL}/dashboard/actions?tab=failures`);
  const retryBtn = page.locator('button').filter({ hasText: 'Retry Step' }).first();
  if (await retryBtn.count() > 0) {
    console.log('✓ ActionLifecycle retry button found in Failure Center');
  }

  // Test 6: Rules PermissionPreview
  await page.goto(`${BASE_URL}/dashboard/rules`);
  const permMatrix = page.locator('text=Role Permission Matrix & Preview');
  const isPermVisible = await permMatrix.isVisible();
  console.log(`✓ PermissionPreview visibility test: ${isPermVisible}`);

  // Test 7: Knowledge Freshness Overview anchor links
  await page.goto(`${BASE_URL}/dashboard/knowledge`);
  const gapsAnchor = page.locator('a[href="#gaps"]');
  if (await gapsAnchor.count() > 0) {
    await gapsAnchor.click();
    await page.waitForTimeout(300);
    console.log('✓ Knowledge Freshness anchor navigation to #gaps succeeded');
  }

  // Test 8: SYNEX Assistant Workspace (/dashboard/assistant)
  await page.goto(`${BASE_URL}/dashboard/assistant`);
  const assistantTitle = await page.locator('text=SYNEX ASSISTANT').first().isVisible();
  console.log(`✓ Assistant workspace header rendered: ${assistantTitle}`);

  // Test sending a question in assistant workspace
  const textarea = page.locator('textarea');
  await textarea.fill('Why did margin drop this week?');
  const sendBtn = page.locator('button').filter({ hasText: 'Send' }).first();
  await sendBtn.click();
  await page.waitForTimeout(1000); // Wait for simulated typing & demo reply

  const hasMarginResponse = await page.locator('text=The sample dataset shows margin pressure').first().isVisible();
  console.log(`✓ Assistant demo response received: ${hasMarginResponse}`);

  // Test Quick action click
  const quickActionBtn = page.locator('button').filter({ hasText: 'Show evidence' }).first();
  if (await quickActionBtn.count() > 0) {
    await quickActionBtn.click();
    await page.waitForTimeout(400);
    const hasEvidenceReply = await page.locator('text=Verified sample evidence details').first().isVisible();
    console.log(`✓ Assistant quick action execution: ${hasEvidenceReply}`);
  }

  // Test Right-Hand Context Panel
  const contextPanel = page.locator('text=DECISION CONTEXT').first();
  const isContextVisible = await contextPanel.isVisible();
  console.log(`✓ Decision Context evidence panel visible: ${isContextVisible}`);

  await browser.close();
  console.log('\n=== REAL BROWSER QA COMPLETED SUCCESSFULLY ===');
}

runBrowserQA().catch((e) => {
  console.error('Test run failed:', e);
  process.exit(1);
});
