// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch' // <-- yarn add whatwg-fetch

import 'setimmediate'

import * as dotenv from 'dotenv'

dotenv.config( {
    path: '.env.test'
} )

jest.mock( './src/helpers/getEnvironments', () => ( {
    getEnvironments: () => ( { ...process.env } )
} ) )

