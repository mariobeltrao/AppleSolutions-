export const site = {
  name: 'Apple Solution',
  address: 'R. Mariangela Lucena Peixoto, 1441 - Sl 101 - Valentina de Figueiredo, João Pessoa - PB, 58063-300',
  whatsapp: '5583998654599', telephone: '+55 (83) 99865-4599', hours: '',
  instagram: 'https://www.instagram.com/applesolutionn/',
};
const address = encodeURIComponent(site.address);
export const maps = {
  embed: `https://www.google.com/maps?q=${address}&output=embed`,
  search: `https://www.google.com/maps/search/?api=1&query=${address}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${address}`,
};
export const whatsappMessage = 'Olá! Vim pelo site da Apple Solution e gostaria de solicitar um orçamento.';
export const contactUrl = (subject = whatsappMessage) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(subject)}`;
