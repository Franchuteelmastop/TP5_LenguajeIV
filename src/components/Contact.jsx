import React, { useState } from 'react'
import emailjs from 'emailjs-com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio.'
    if (!form.email.trim()) errs.email = 'El correo es obligatorio.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'El correo no es válido.'
    if (!form.message.trim()) errs.message = 'El mensaje es obligatorio.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    const SERVICE_ID = 'service_jth9kap'
    const TEMPLATE_ID = 'template_x23co2p'
    const USER_ID = 'ubqV6yDIaSURLN3FS'

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      })
      .catch(() => {
        setStatus('error')
      })
  }

  return (
    <main className="container contact-grid">
      <div className="contact-card">
        <h1>Contacto</h1>
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Dirección de Correo</label>
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Mensaje</label>
            <textarea name="message" value={form.message} onChange={handleChange} />
            {errors.message && <div className="error">{errors.message}</div>}
          </div>

          <button type="submit" disabled={status === 'sending'}>Enviar</button>
        </form>

        {status === 'success' && <div className="confirm">Correo enviado correctamente.</div>}
        {status === 'error' && <div className="error">Ocurrió un error al enviar el correo.</div>}
      </div>

      <div className="map-card">
        <h2>Ubicación</h2>
        <iframe
          title="Mapa - Universidad Católica de Salta"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3364.912487769876!2d-65.41086898481193!3d-24.808348784117355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941d7d2c1c0c8d3b%3A0x6d5b6d0f2f4f8a0a!2sUniversidad%20Cat%C3%B3lica%20de%20Salta!5e0!3m2!1ses!2sar!4v1690000000000!5m2!1ses!2sar"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </main>
  )
}
