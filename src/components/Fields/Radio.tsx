import React from 'react'

interface Props {
  text: string
}

type RadioProps = Props & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Radio: React.FC<RadioProps> = ({ text, ...props }) => {
  return (
    <>
      <input
        key={props.key}
        type='radio'
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      /> {text}
      <br />
    </>
  )
}

export default Radio
