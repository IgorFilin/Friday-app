import React, { SyntheticEvent } from 'react'
import imageNotFound from 'assets/notImage.jpg'

export const UniCell: React.FC<{ data: string; alt?: string }> = ({ data, alt }) => {
    const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) =>
        (e.currentTarget.src = imageNotFound)

    return (
        <>
            {data.startsWith('data:image/') ? (
                <img src={data} alt={alt} onError={onErrorHandler} />
            ) : (
                <span>{data}</span>
            )}
        </>
    )
}
