import { useEffect, useMemo } from 'react'
import { useState } from "react"

export const useForm = ( initialForm = {}, formValidations = {} ) => {

    const [ formState, setFormState ] = useState( initialForm )

    const [ formValidation, setFormValidation ] = useState( {} )

    useEffect( () => {
        setFormState( initialForm )
    }, [ initialForm ] )

    useEffect( () => {
        createValidators()
    }, [ formState ] )

    const isFormValid = useMemo( () => {

        for ( const formValue of Object.keys( formValidation ) ) {
            if ( formValidation[ formValue ] !== null ) return false
        }

        return true

    }, [ formValidation ] )


    const onInputChange = ( { target } ) => {

        const { name, value } = target

        setFormState( {
            ...formState,
            [ name ]: value
        } )
    }

    const onResetForm = () => {
        setFormState( initialForm )
    }

    const createValidators = () => {

        const formCheckValues = {}

        for ( const formField of Object.keys( formValidations ) ) {

            const [ fn, errorMessage = 'This field is required' ] = formValidations[ formField ]

            formCheckValues[ `${ formField }Valid` ] = fn( formState[ formField ] ) ? null : errorMessage
        }

        setFormValidation( formCheckValues )
    }

    return {
        formState,
        formValidation,
        onInputChange,
        onResetForm,
        isFormValid
    }
}