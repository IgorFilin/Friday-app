import React from 'react'

export const UniCell: React.FC<{ text: string }> = ({ text }) => (
    <>{text.startsWith('data:image/') ? <img src={text} alt="question" /> : text}</>
)
