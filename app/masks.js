const maskCpf = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1-$2')
}

const inputSellerCpf = document.getElementById('sellerCpf')
const inputPurchaserCpf = document.getElementById('purchaserCpf')

inputSellerCpf.addEventListener('input', (event) => {
    event.target.value = maskCpf(event.target.value)
}, false)

inputPurchaserCpf.addEventListener('input', (event) => {
    event.target.value = maskCpf(event.target.value)
}, false)
