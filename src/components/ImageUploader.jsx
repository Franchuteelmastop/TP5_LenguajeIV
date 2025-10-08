import React, { useState } from 'react'

function ImageUploader() {
  const [preview, setPreview] = useState(null)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setMessage('No se seleccionó ningún archivo.')
      setPreview(null)
      return
    }

    if (!file.type.startsWith('image/')) {
      setMessage('El archivo seleccionado no es una imagen.')
      setPreview(null)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target.result)
      setMessage('Imagen cargada correctamente.')
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <p className="message">{message}</p>
      {preview && <img src={preview} alt="Previsualización" className="preview" />}
    </section>
  )
}

export default ImageUploader
