import dayjs from 'dayjs'

export const formatDate = (date: string) => dayjs(date).format('DD.MM.YYYY')

export const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (reader.result) resolve(reader.result as string)
            else reject('getBase64: Unexpected error')
        }
        reader.onerror = (error) => reject(error)
    })

export const isBase64 = (data: string) => data.startsWith('data:image/')
