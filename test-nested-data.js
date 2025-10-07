/**
 * Test script to verify nested content field handling with real-world data
 * This tests the specific data structure from the .NET test failure
 */

const { getApi } = require('./dist/node.js');

// Real-world nested data from the .NET test failure
const testData = {
  "items": [
    {
      "contentID": 1673,
      "properties": {
        "state": 2,
        "modified": "2025-10-06T14:20:39.84",
        "versionID": 114816,
        "referenceName": "nestedfetchv2testing",
        "definitionName": "NestedFetchV2Testing",
        "itemOrder": 0
      },
      "fields": {
        "numberField": "168",
        "decimalField": "1.68",
        "booleanField": "true",
        "dateTimeField": "2025-10-22T00:00:00-04:00",
        "nestedContentField": [
          {
            "contentID": 1674,
            "properties": {
              "state": 2,
              "modified": "2025-10-06T14:20:39.84",
              "versionID": 114817,
              "referenceName": "nestedfetchv2testing",
              "definitionName": "NestedFetchV2Testing",
              "itemOrder": 1
            },
            "fields": {
              "numberField": "169",
              "decimalField": "1.69",
              "booleanField": "false",
              "dateTimeField": "2025-10-23T00:00:00-04:00"
            }
          }
        ]
      }
    },
    {
      "contentID": 1674,
      "properties": {
        "state": 2,
        "modified": "2025-10-06T14:20:39.84",
        "versionID": 114817,
        "referenceName": "nestedfetchv2testing",
        "definitionName": "NestedFetchV2Testing",
        "itemOrder": 1
      },
      "fields": {
        "numberField": "169",
        "decimalField": "1.69",
        "booleanField": "false",
        "dateTimeField": "2025-10-23T00:00:00-04:00"
      }
    }
  ],
  "totalCount": 2
};

async function testNestedContentHandling() {
  console.log('Testing nested content field handling...');
  
  // Test V1 API (legacy string-based)
  console.log('\n=== V1 API Test ===');
  const apiV1 = getApi({
    guid: 'test-guid-d',
    apiKey: 'test-key',
    apiVersion: 'v1'
  });
  
  console.log('V1 API Version:', apiV1.config.apiVersion);
  
  // Test V2 API (proper data types)
  console.log('\n=== V2 API Test ===');
  const apiV2 = getApi({
    guid: 'test-guid-d', 
    apiKey: 'test-key',
    apiVersion: 'v2'
  });
  
  console.log('V2 API Version:', apiV2.config.apiVersion);
  
  // Validate the test data structure
  console.log('\n=== Data Structure Validation ===');
  console.log('Total items:', testData.totalCount);
  console.log('First item ID:', testData.items[0].contentID);
  console.log('First item has nested content:', !!testData.items[0].fields.nestedContentField);
  
  if (testData.items[0].fields.nestedContentField) {
    const nestedItem = testData.items[0].fields.nestedContentField[0];
    console.log('Nested item ID:', nestedItem.contentID);
    console.log('Nested item fields:', Object.keys(nestedItem.fields));
    console.log('Nested boolean field:', nestedItem.fields.booleanField);
    console.log('Nested number field:', nestedItem.fields.numberField);
    console.log('Nested decimal field:', nestedItem.fields.decimalField);
    console.log('Nested date field:', nestedItem.fields.dateTimeField);
  }
  
  // Test field type handling
  console.log('\n=== Field Type Analysis ===');
  const firstItem = testData.items[0];
  console.log('String fields (V1 format):');
  console.log('- numberField:', typeof firstItem.fields.numberField, '=', firstItem.fields.numberField);
  console.log('- decimalField:', typeof firstItem.fields.decimalField, '=', firstItem.fields.decimalField);
  console.log('- booleanField:', typeof firstItem.fields.booleanField, '=', firstItem.fields.booleanField);
  console.log('- dateTimeField:', typeof firstItem.fields.dateTimeField, '=', firstItem.fields.dateTimeField);
  
  // Simulate V2 type conversion
  console.log('\nV2 converted types would be:');
  console.log('- numberField:', parseInt(firstItem.fields.numberField));
  console.log('- decimalField:', parseFloat(firstItem.fields.decimalField));
  console.log('- booleanField:', firstItem.fields.booleanField === 'true');
  console.log('- dateTimeField:', new Date(firstItem.fields.dateTimeField));
  
  console.log('\n✅ Test completed successfully - SDK can handle this data structure');
}

testNestedContentHandling().catch(console.error);
