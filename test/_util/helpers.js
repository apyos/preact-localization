import { teardown as testUtilTeardown } from 'preact/test-utils'

export function setupScratch() {
  const scratch = document.createElement('div')
  scratch.id = 'scratch'
  ;(document.body || document.documentElement).appendChild(scratch)
  return scratch
}

export function teardown(scratch) {
  if (scratch) {
    scratch.parentNode.removeChild(scratch)
  }

  testUtilTeardown()
}
