/**
 * Verification Script for AI Orbit Companies Backend
 * 
 * This script helps verify that the backend is set up correctly.
 * Run after: npm install && npm run db:push && npm run db:seed
 * 
 * Usage: node verify-setup.js
 */

const BASE_URL = 'http://localhost:3000'

const tests = [
  {
    name: 'List Companies',
    url: '/api/companies',
    expected: {
      status: 200,
      hasField: 'data.companies',
      hasField2: 'data.pagination'
    }
  },
  {
    name: 'Search Companies',
    url: '/api/companies?search=OpenAI',
    expected: {
      status: 200,
      hasField: 'data.companies'
    }
  },
  {
    name: 'Filter by Type',
    url: '/api/companies?companyType=STARTUP',
    expected: {
      status: 200,
      hasField: 'data.companies'
    }
  },
  {
    name: 'Sort by Name',
    url: '/api/companies?sort=name-asc',
    expected: {
      status: 200,
      hasField: 'data.companies'
    }
  },
  {
    name: 'Get Company Detail',
    url: '/api/companies/openai',
    expected: {
      status: 200,
      hasField: 'data.name',
      hasField2: 'data.products'
    }
  },
  {
    name: '404 - Invalid Company',
    url: '/api/companies/nonexistent',
    expected: {
      status: 404,
      hasField: 'error.message'
    }
  },
  {
    name: 'Invalid Parameter',
    url: '/api/companies?companyType=INVALID',
    expected: {
      status: 400,
      hasField: 'error'
    }
  }
]

async function runTests() {
  console.log('🧪 Starting API Verification Tests\n')
  console.log(`Testing against: ${BASE_URL}\n`)
  console.log('Make sure the dev server is running: npm run dev\n')
  console.log('─'.repeat(60))

  let passed = 0
  let failed = 0

  for (const test of tests) {
    try {
      const url = `${BASE_URL}${test.url}`
      const response = await fetch(url)
      const data = await response.json()

      const statusMatch = response.status === test.expected.status
      
      let fieldExists = true
      if (test.expected.hasField) {
        const fields = test.expected.hasField.split('.')
        let current = data
        for (const field of fields) {
          if (current && current[field] !== undefined) {
            current = current[field]
          } else {
            fieldExists = false
            break
          }
        }
      }

      if (statusMatch && fieldExists) {
        console.log(`✓ ${test.name}`)
        passed++
      } else {
        console.log(`✗ ${test.name}`)
        console.log(`  Expected status: ${test.expected.status}, Got: ${response.status}`)
        console.log(`  Response:`, JSON.stringify(data, null, 2).substring(0, 200))
        failed++
      }
    } catch (error) {
      console.log(`✗ ${test.name}`)
      console.log(`  Error: ${error.message}`)
      failed++
    }
  }

  console.log('\n' + '─'.repeat(60))
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`)
  
  if (failed === 0) {
    console.log('✅ All tests passed! Backend is working correctly.\n')
  } else {
    console.log('❌ Some tests failed. Check the output above.\n')
    console.log('Common issues:')
    console.log('  - Dev server not running (npm run dev)')
    console.log('  - Database not seeded (npm run db:seed)')
    console.log('  - Database connection issue (check .env)')
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18 or higher (for native fetch)')
  console.log('\nAlternatively, test manually:')
  tests.forEach(test => {
    console.log(`\ncurl "${BASE_URL}${test.url}"`)
  })
  process.exit(1)
}

runTests().catch(console.error)
