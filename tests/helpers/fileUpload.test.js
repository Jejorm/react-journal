import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helpers/fileUpload'

cloudinary.config( {
    cloud_name: 'jejorm',
    api_key: '252231295911185',
    api_secret: 'ih-CdyZ3ksqzifayII3DnJIdW8Q',
    secure: true
} )

describe( 'Pruebas en fileUpload', () => {

    test( 'Debe subir la imagen correctamente a cloudinary', async () => {

        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg'

        const resp = await fetch( imageUrl )

        const blob = await resp.blob()

        const file = new File( [ blob ], 'photo.jpg' )

        const url = await fileUpload( file )

        expect( typeof url ).toBe( 'string' )

        const segments = url.split( '/' )

        const imageId = segments[ segments.length - 1 ].replace( '.jpg', '' )

        await cloudinary.api.delete_resources( [ 'journal/' + imageId ], {
            resource_type: 'image'
        } )
    } )

    test( 'Debe retornar null', async () => {

        const file = new File( [], 'photo.jpg' )

        const url = await fileUpload( file )

        expect( url ).toBe( null )
    } )
} )