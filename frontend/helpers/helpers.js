export const truncate = (string, length) => {
    return `${string.split(' ').splice(0, length).join(' ')}...`
}

export const formatDate = (date) => {
    const dateHandler = new Date(date)
    const day = dateHandler.getDate()
    const month = dateHandler.getMonth() + 1
    const monthWithZero = month < 10 ? `0${month}` : month
    const year = dateHandler.getFullYear()
    const formattedDate = `${day}.${monthWithZero}.${year}`
    return formattedDate
}
