import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import Button from './components/Button'
import CheckboxInput from './components/CheckboxInput'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charactersAllowed, setCharactersAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const checkPassword = useCallback((password) => {
    const format = /[@#$&%!~]/
    if (numbersAllowed) {
      if (!(/\d/.test(password))) return false
    }
    if (charactersAllowed) {
      if (!format.test(password)) return false
    }

    return true
  }, [charactersAllowed, numbersAllowed])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = ""

    for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
      str += String.fromCharCode(c)
    }

    for (let c = 'A'.charCodeAt(0); c <= 'Z'.charCodeAt(0); c++) {
      str += String.fromCharCode(c)
    }

    if (numbersAllowed) {
      for (let d = '0'; d <= '9'; d++) {
        str += d
      }
    }

    if (charactersAllowed) {
      str += "@#$&%!~"
    }

    do {
      pass = ""
      for (let i = 0; i <= length; i++) {
        let randomPos = Math.floor(Math.random() * str.length)
        pass += str.charAt(randomPos)
      }
    }
    while (!checkPassword(pass))

    setPassword(pass)
  }, [charactersAllowed, checkPassword, length, numbersAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const refreshPassword = useCallback(() => {
    passwordGenerator()
  }, [passwordGenerator])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charactersAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full text-gray-300'>
        <h1 className='items-center'>Password Generator</h1>
        <div className='w-full'>
          <input type="text"
            value={password}
            className='w-full mx-auto p-5 m-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
        </div>
        <div className='flex flex-col md:flex-row text-sm gap-x-2 justify-evenly'>
          <div className='flex items-center gap-x-1'>
            <input type="range" name="" id="length" min={6} max={20} value={length} className='cursor-pointer'
              onChange={e => setLength(e.target.value)} />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <CheckboxInput id={"numberInput"} defaultChecked={numbersAllowed} onChangeFn={setNumbersAllowed} label={"Number"} />
          <CheckboxInput id={"characterInput"} defaultChecked={charactersAllowed} onChangeFn={setCharactersAllowed} label={"Special Characters"} />
        </div>
        <div className='flex text-sm gap-x-10 justify-evenly'>
          <Button className={'focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-5'} onClickFn={copyPasswordToClipboard} label={"Copy"} />
          <Button className={'focus:outline-none text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900 m-5'} onClickFn={refreshPassword} label={"Refresh"} />
        </div>
      </div>
    </>
  )
}

export default App
