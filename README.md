# DashUI Framework Setup Guide

## 🚀 Quick Start for New PC Setup

Follow these steps to set up the testing framework on a new machine:

### 1. Prerequisites

- **Node.js**: Version 20.x or later ([Download](https://nodejs.org/))
- **Git**: For cloning the repository
- **VS Code**: Recommended editor

### 2. Installation Steps

```bash
# 1. Clone the repository (if not already done)
git clone https://github.com/praverma-clgx/DashView.git
cd DashView

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npm run test:install
# OR
npx playwright install --with-deps chromium
```

### 3. Environment Configuration

⚠️ **CRITICAL STEP** - Configure your environment variables:

1. **Create a `.env` file** in the root directory (if it doesn't exist)
2. Set the `TEST_ENV` variable to your desired environment:

   ```dotenv
   TEST_ENV=first_general  # Options: first_general, paul_devis, service_master, evans
   ```

3. Add the corresponding environment variables with valid values:
   - For `TEST_ENV=first_general`, add these variables:
     ```dotenv
     FIRST_GENERAL_ENTERPRISE_LOGIN_URL=https://your-enterprise-url
     FIRST_GENERAL_ENTERPRISE_COMPANY_ID=your-company-id
     FIRST_GENERAL_ENTERPRISE_USERNAME=your-username
     FIRST_GENERAL_ENTERPRISE_PASSWORD=your-password
     ```
   - For other environments (paul_devis, service_master, evans), use the same pattern with the environment prefix

4. **Save the file** after making changes

**Note**: The `.env` file is automatically loaded by `global-setup.js` using `dotenv`. Never commit this file to version control.

### 4. Verify Setup

```bash
# Run a simple test to verify everything works
npm test -- --grep "Home Page"
```

## 🔧 Common Setup Issues

### Issue 1: "url: expected string, got undefined"

**Symptom**: Error when running tests on new setup

```
Error: page.goto: url: expected string, got undefined
```

**Solution**:

1. Check your `.env` file exists in the root directory
2. Verify `TEST_ENV` is set (e.g., `TEST_ENV=first_general`)
3. Ensure the environment-specific variables are configured:
   - If `TEST_ENV=first_general`, check `FIRST_GENERAL_ENTERPRISE_LOGIN_URL` is set
   - If `TEST_ENV=paul_devis`, check `PAUL_DEVIS_ENTERPRISE_LOGIN_URL` is set
   - etc.
4. Make sure there are no typos in variable names
5. Restart your terminal/IDE after modifying `.env`

### Issue 2: Missing Dependencies

**Solution**:

```bash
npm install
npx playwright install --with-deps chromium
```

### Issue 3: Authentication Fails

**Solution**:

1. Verify credentials in `.env` are correct
2. Delete `.auth` folder and run tests again:
   ```bash
   rm -rf .auth
   npm test
   ```

## 📁 Project Structure

```
DashView/
├── .env                    # Environment configuration (IMPORTANT! - Create this file)
├── eslint.config.js       # ESLint configuration
├── global-setup.js        # Authentication setup (loads .env automatically)
├── global-teardown.js     # Cleanup after test execution
├── playwright.config.js   # Playwright configuration
├── package.json           # Dependencies and scripts
├── README.md              # This file - Quick start guide
├── zSetup                 # Detailed setup guide for new machines
├── config/                # Configuration files
│   ├── browser.config.js       # Browser settings
│   ├── environment.config.js   # Environment variables loader
│   └── timeout.config.js       # Centralized timeout configuration
├── docs/                  # Documentation
│   ├── CI-CD-SETUP.md
│   └── ...
├── e2e/                   # Example test files
├── fixtures/              # Test fixtures
│   └── enterpriseFixtures.js
├── pageObjects/           # Page Object Models
│   └── enterprise/
├── playwright-report/     # Generated HTML test reports
├── scripts/               # Utility scripts
│   ├── cleanup.js
│   └── ...
├── test-results/          # Test artifacts (screenshots, traces, videos)
├── testData/              # Test data files (JSON)
│   └── enterprise/
├── tests/                 # Test files
│   └── Enterprise/
└── utils/                 # Utility helpers
    ├── enterpriseClaimGenerator.js
    ├── enterpriseJobGenerator.js
    ├── helpers.js
    ├── randomNumber.js
    └── searchJobNumber.js
```

## ✨ Key Features

- 🔒 Enterprise-only flows (no admin logic required)
- 🔔 Automatic notification handling
- 🧪 Playwright-based E2E testing
- 📊 HTML and artifact reporting
- 🛠️ Utility scripts for setup, cleanup, and verification

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run only enterprise tests
npm run test:enterprise

# Run with UI mode (interactive)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Run tests for CI/CD (with multiple reporters)
npm run test:ci

# Run specific test file
npx playwright test tests/Enterprise/Administration/acceptJob.spec.js

# Run with more workers (parallel execution)
npx playwright test --workers=4
```

## 🌍 Environment Management

### Available Environments

The framework supports multiple environments configured via `TEST_ENV`:

- `first_general` - First General environment
- `paul_devis` - Paul Devis environment
- `service_master` - Service Master environment
- `evans` - Evans environment

### Switching Environments

Edit `.env` file:

```dotenv
TEST_ENV=first_general  # Change this to switch environments
```

Or use the provided script to run all environments sequentially:

```bash
node run-all-envs.js
```

## 📊 Viewing Test Results

After running tests:

```bash
# Open HTML report
npx playwright show-report
```

Reports are generated in:

- `playwright-report/` - HTML reports
- `test-results/` - Test artifacts and screenshots

## 🐛 Debugging

### Debug a specific test

```bash
npx playwright test --debug tests/Enterprise/Administration/acceptJob.spec.js
```

### Generate trace

```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

### Debug with VS Code

1. Install the "Playwright Test for VSCode" extension
2. Open the Testing panel (Test tube icon in sidebar)
3. Click the debug icon next to any test

## 📝 Writing Tests

### Using Page Object Model

```javascript
import { expect, test } from '../../fixtures/sharedFixtures.js';
import AcceptJobPage from '../../pageObjects/enterprise/Administration/acceptJob.po.js';

test('My test', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const acceptJobPage = new AcceptJobPage(page);

  await acceptJobPage.navigateToAcceptJob();
  // ... rest of test
});
```

## 🤝 Collaboration and Pull Request Access

If someone else opens a pull request and then sees that they **cannot push to the branch**, that is usually a GitHub permission issue rather than a problem in this test framework.

- Only the branch owner and users with **write access** to this repository can push to a branch in this repository.
- If the pull request comes from a **fork**, the PR author controls that branch. Maintainers can only push if the author enables **Allow edits by maintainers**.
- If two contributors both need to push changes, the safest workflow is for each person to work from **their own branch or fork** and open/update the pull request from there.
- Repository push permissions and protected branch rules are managed in **GitHub repository settings**, not in the test code in this repo.

### Recommended fix when a contributor cannot push

1. Confirm whether the PR branch lives in this repository or in the contributor's fork.
2. If the branch is in this repository, ask a maintainer to grant the contributor the required **write/collaborator access**.
3. If the branch is in a fork, ask the PR author to either push the change themselves or enable **Allow edits by maintainers** on the PR.
4. If shared access is not available, create a new branch from the latest target branch and open a replacement PR from an account that can push to it.

## 🤝 Getting Help

If you encounter issues:

1. Check this README
2. Review `CI-CD-SETUP.md` for CI/CD specific setup
3. Verify all environment variables in `.env`
4. Check the error logs in `test-execution.log`
5. Contact the team

## ⚙️ Advanced Configuration

### Browser Settings

Edit `config/browser.config.js` for browser-specific settings

### Timeouts

Edit `config/environment.config.js` to adjust timeout values

### Retry Logic

Configure in `playwright.config.js`:

```javascript
retries: process.env.CI ? 2 : 0;
```

### Environment Mapping & Project Selection

The framework automatically maps `TEST_ENV` to the correct Playwright project:

- `TEST_ENV=first_general` → Playwright project: `FirstGeneral`
- `TEST_ENV=paul_devis` → Playwright project: `PaulDevis`
- `TEST_ENV=service_master` → Playwright project: `ServiceMaster`
- `TEST_ENV=evans` → Playwright project: `EvansProduction`

Only the selected environment is authenticated and tested. This speeds up test runs and ensures isolation.

### Report Naming

Test reports are named using the initials of the selected environment. For example:
- `first_general` → `FG-...`
- `service_master` → `SM-...`
- `paul_devis` → `PD-...`
- `evans` → `E-...`

This is handled automatically based on your `.env` configuration.
