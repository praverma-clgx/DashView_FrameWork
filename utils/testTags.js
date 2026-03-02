/**
 * Test tagging utilities for environment-specific test execution
 */

import { config } from '../config/environment.config.js';

/**
 * Determines if tests should run based on environment
 * @param {string} allowedEnvironments - Comma-separated list of allowed environments
 * @returns {boolean} - True if test should be skipped
 */
export function shouldSkipInEnvironment(...allowedEnvironments) {
  const currentEnv = process.env.ENV || 'stage';
  const baseUrl = config.enterprise?.baseUrl || '';

  // Check if production URL
  const isProd =
    baseUrl.includes('first_general') || baseUrl.includes('fgs-ngs.net') || currentEnv === 'first_general';
  const isPaulDevis =
    baseUrl.toLowerCase().includes('pauldevis') || currentEnv.toLowerCase() === 'pauldevis';
  const isServiceMaster =
    baseUrl.toLowerCase().includes('servicemaster') || currentEnv.toLowerCase() === 'servicemaster';
  const isEvans =
    baseUrl.toLowerCase().includes('evans') || currentEnv.toLowerCase() === 'evans';

  // Check if current environment is allowed
  const isAllowed = allowedEnvironments.some(
    (env) => currentEnv.toLowerCase() === env.toLowerCase(),
  );

  // Skip if production and not explicitly allowed
  if (isProd && !allowedEnvironments.includes('first_general')) {
    return true;
  }
  if (isPaulDevis && !allowedEnvironments.includes('pauldevis')) {
    return true;
  }
  if (isServiceMaster && !allowedEnvironments.includes('servicemaster')) {
    return true;
  }
  if (isEvans && !allowedEnvironments.includes('evans')) {
    return true;
  }

  return false;
}
/**
 * Check if running in Paul Devis environment
 * @returns {boolean}
 */
export function isPaulDevis() {
  const baseUrl = config.enterprise?.baseUrl || '';
  const env = process.env.ENV || '';
  return baseUrl.toLowerCase().includes('pauldevis') || env.toLowerCase() === 'pauldevis';
}

/**
 * Check if running in ServiceMaster environment
 * @returns {boolean}
 */
export function isServiceMaster() {
  const baseUrl = config.enterprise?.baseUrl || '';
  const env = process.env.ENV || '';
  return baseUrl.toLowerCase().includes('servicemaster') || env.toLowerCase() === 'servicemaster';
}

/**
 * Check if running in Evans environment
 * @returns {boolean}
 */
export function isEvans() {
  const baseUrl = config.enterprise?.baseUrl || '';
  const env = process.env.ENV || '';
  return baseUrl.toLowerCase().includes('evans') || env.toLowerCase() === 'evans';
}

/**
 * Check if running in production
 * @returns {boolean}
 */
export function isFirstGeneral() {
  const baseUrl = config.enterprise?.baseUrl || '';
  const testEnv = process.env.TEST_ENV || '';

  return (
    baseUrl.includes('first_general') ||
    baseUrl.includes('fgs-ngs.net') || // First General specific domain
    testEnv.toLowerCase() === 'first_general' ||
    testEnv.toLowerCase() === 'fgs-ngs.net' ||
    process.env.ENV === 'first_general'
  );
}

/**
 * Check if running in staging
 * @returns {boolean}
 */
export function isStaging() {
  const baseUrl = config.enterprise?.baseUrl || '';
  return (
    baseUrl.includes('stage') ||
    baseUrl.includes('staging') ||
    process.env.ENV === 'staging' ||
    process.env.ENV === 'stage'
  );
}

/**
 * Check if running in development
 * @returns {boolean}
 */
export function isDevelopment() {
  const baseUrl = config.enterprise?.baseUrl || '';
  return baseUrl.includes('dev') || process.env.ENV === 'dev' || process.env.ENV === 'development';
}
