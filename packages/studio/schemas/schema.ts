// First, we must import the schema creator
// @ts-ignore
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
// @ts-ignore
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document schemas
import * as documents from './documents'

// Object types
import * as objects from './objects'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',

  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    ...Object.values(documents),

    // Object types
    ...Object.values(objects),

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
})
