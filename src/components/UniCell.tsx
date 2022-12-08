import React, { SyntheticEvent } from 'react'
import imageNotFound from 'assets/notImage.jpg'
import { isBase64 } from 'utils'

export const UniCell: React.FC<{ data: string; alt?: string }> = ({ data, alt }) => {
    const onErrorHandler = (e: SyntheticEvent<HTMLImageElement, Event>) =>
        (e.currentTarget.src = imageNotFound)

    return (
        <>
            {isBase64(data) ? (
                <img height="64px" src={data} alt={alt} onError={onErrorHandler} />
            ) : (
                <span>{data}</span>
            )}
        </>
    )
}
