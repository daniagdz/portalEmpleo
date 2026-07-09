import { useEffect, useState } from "react";

export function useContactForm() {
    const [formValues, setFormValues] = useState({
        nameU: '',
        surnameU: '',
        mail: '',
        telefono: ''

    })

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSending, setIsSending] = useState(false)

    //emular envio
    useEffect(() => {
        if (isSubmitted) {
            const delay = setTimeout(() => setIsSubmitted(false), 3000)
            return () => clearTimeout(delay)

        }
    }, [isSubmitted])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues({
            ...formValues,
            [name]: value
        })

        if (error[name]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }


    //validacion de valores
    const validateForm = () => {
        const localErrors = {} //crear objeto vacío donde añadimos "errores" por clave-valor

        if (!formValues.nameU.trim()) localErrors.nameU = 'El nombre es obligatorio'
        if (!formValues.surnameU.trim()) localErrors.surnameU = 'El apellido es obligatorio'

        if (!formValues.mail.trim()) {
            localErrors.mail = 'El correo es obligatorio'
        } else if (!/\S+@\S+\.\S/.test(formValues.mail)) {
            localErrors.mail = 'El formato del correo es inválido'
        }

        if (!formValues.telefono.trim()) localErrors.telefono = 'El teléfono es obligatorio'

        setErrors(localErrors)
        for (const someError in localErrors) {
            return false
        }
        return true
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            setIsSending(true)

            setTimeout(() => {
                setIsSending(false)
                setIsSubmitted(true)

                //limpiar form
                setFormValues({
                    nameU: '',
                    surnameU: '',
                    mail: '',
                    telefono: ''
                })
            }, 1200)
        }
    }

    return {
        formValues,
        errors,
        isSending,
        isSubmitted,
        handleChange,
        handleSubmit
    }

}