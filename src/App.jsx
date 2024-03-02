import { useState, useCallback,useEffect,useRef } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowled, setnumberAllowed] = useState(false);
  const [charAllowled, setcharAllowled] = useState(false);
  const [Password, setPassword] = useState("")
  const passRef=useRef(null);
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowled) {
      str += "0123456789"
    }
    if (charAllowled) {
      str += "!~_&$#@^*?`,><"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowled, charAllowled, setPassword])
  const passwordcopy=useCallback(()=>{
      passRef.current?.select()
      window.navigator.clipboard.writeText(Password)
  },[Password])
  useEffect(()=>{PasswordGenerator()},[length,numberAllowled,charAllowled,PasswordGenerator])
  return (
    <>
      <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden">
          <input type="text"
            value={Password}
            className="outline-none w-full py-1 px-3 bg-black-200 text-center justify-center"
            placeholder="password" readOnly ref={passRef}
          />
          <button className="outline-none  bg-blue-500 text-white px-3 py-0.2 shrink-0" onClick={passwordcopy}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={100} value={length} className="cursor-pointer" onChange={(e) => {
              setLength(e.target.value)
            }} />
            <label htmlFor="">Length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowled} id="numberInput" 
               onChange={()=>{
                setnumberAllowed((prev)=>!prev);
               }}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowled} id="charecterInput" 
               onChange={()=>{
                setcharAllowled((prev)=>!prev);
               }}
            />
            <label htmlFor="">Special Charecter</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
