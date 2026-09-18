import { useContactForm } from "../hooks/useContactForm"

export function ContactForm() {

    const {
        formValues,
        errors,
        isSending,
        isSubmitted,
        handleChange,
        handleSubmit
    } = useContactForm()

    return (
        <>

            {isSubmitted && (
                <div className="validateMess">
                    ¡Formulario enviado con éxito! Nos pondremos en contacto pronto.
                </div>
            )}
            <div className="contactContent">


                <form id="contForm" onSubmit={handleSubmit}>

                    <p>Nombre:
                        {errors.nameU && <span className='errorFormSty'>{errors.nameU}</span>}

                    </p>
                    <input
                        type="text"
                        name="nameU"
                        placeholder="Nombre"
                        value={formValues.nameU}
                        onChange={handleChange}
                    />

                    <p>Apellidos:
                        {errors.surnameU && <span className='errorFormSty'>{errors.surnameU}</span>}

                    </p>
                    <input
                        type="text"
                        name="surnameU"
                        placeholder="Apellido"
                        value={formValues.surnameU}
                        onChange={handleChange}
                    />

                    <p>Correo: {errors.mail && <span className='errorFormSty'>{errors.mail}</span>}</p>
                    <input
                        type="email"
                        name="mail"
                        placeholder="Correo"
                        value={formValues.mail}
                        onChange={handleChange}
                    />

                    <p>Teléfono:
                        {errors.telefono && <span className='errorFormSty' className='errorFormSty'>{errors.telefono}</span>}

                    </p>
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        value={formValues.telefono}
                        onChange={handleChange}
                    />

                    {/* Deshabilita el botón mientras se envía (Opcional completado) */}
                    <button type="submit" id="sendId" disabled={isSending}>
                        {isSending ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </>
    )
}