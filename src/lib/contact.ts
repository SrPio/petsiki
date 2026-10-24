const digits = (phone: string) => phone.replace(/\D/g, '')

/** Link de WhatsApp con un mensaje inicial. */
export function whatsappUrl(phone: string, message: string) {
  return `https://wa.me/${digits(phone)}?text=${encodeURIComponent(message)}`
}

export function telUrl(phone: string) {
  const d = digits(phone)
  return `tel:${phone.trim().startsWith('+') ? '+' : ''}${d}`
}

export function mailtoUrl(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function adoptionMessage(petName: string) {
  return `Hola, vi a ${petName} en Petsiki y me interesa adoptarle. ¿Podemos coordinar?`
}
