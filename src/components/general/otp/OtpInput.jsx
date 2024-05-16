import style from './index.module.scss'
import PropTypes from 'prop-types'
import { createRef, useRef, useEffect } from 'react'

import { useController } from 'react-hook-form'

function OtpInput({ name, numberOfInputs, control, rules, setIsOtpCompleted }) {
  let inputs = []
  const {
    field: { onChange }
  } = useController({ name, control, rules })
  const inputRefs = useRef([])
  const inputArray = Array.from({ length: numberOfInputs })

  inputRefs.current = inputArray.map((_, i) => inputRefs.current[i] ?? createRef())

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  const focusInput = (index) => {
    inputRefs.current[index].focus()
    inputRefs.current[index].select()
  }

  const handleInput = (index) => {
    let otpValues = ''
    for (const input of inputRefs.current) {
      otpValues += input.value
    }

    onChange(otpValues)

    if (otpValues.length === numberOfInputs) setIsOtpCompleted(false)
    else setIsOtpCompleted(true)

    if (index < numberOfInputs - 1 && inputRefs.current[index].value) {
      focusInput(index + 1)
    }
  }
  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' || event.key === 'Delete') handleBackspace(index)
    else if (event.key === 'ArrowLeft' && index > 0) focusInput(index - 1)
    else if (event.key === 'ArrowRight' && index < numberOfInputs - 1) focusInput(index + 1)
  }

  const handleBackspace = (index) => {
    if (index > 0) {
      inputRefs.current[index].value = ''

      focusInput(index - 1)
    } else return
  }

  inputArray.map((_, index) => {
    const inputName = `${name}[${index}]`
    inputs.push(
      <input
        className={style['otp-inputs__input']}
        key={inputName}
        name={inputName}
        type="tel"
        maxLength={1}
        ref={(el) => (inputRefs.current[index] = el)}
        onInput={() => handleInput(index)}
        onKeyDown={(event) => handleKeyDown(event, index)}
      />
    )
  })

  return <div className={style['otp-inputs']}>{inputs}</div>
}

export default OtpInput

OtpInput.propTypes = {
  numberOfInputs: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  setIsOtpCompleted: PropTypes.func
}
