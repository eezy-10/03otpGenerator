import { useCallback, useEffect, useRef, useState } from "react"

function App() {

  const [otp, setOtp] = useState('');
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const otpRef = useRef(null);

  const otpGenerator = useCallback(() => {
    let otp = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += '0123456789';
    if(charAllowed) str += '!@#$%^&*()_+~`|}{'
    
    for(let i = 1; i <= length; i++){
      otp += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setOtp(otp);
  }, [length, charAllowed, numberAllowed, setOtp]);

  useEffect(()=>{
    otpGenerator();
  },[length, numberAllowed, charAllowed, otpGenerator]);

  const copytoClipboard = useCallback(() =>{
    otpRef?.current?.select();
    navigator.clipboard.writeText(otp);
  },[otp]);
  
  return (
    <>
      <div className="bg-[#0d1b2a] w-full h-screen flex justify-center">
        <div className="bg-[#e0e1dd] min-w-md h-50 rounded-md mt-10 px-4 py-3">
          <h1 className="text-3xl text-center mb-3">OTP Generator</h1>
          <div className="min-w-3xs bg-white flex rounded-md justify-between">
            <input className="pl-2"
            type="text"
            readOnly 
            value={otp}
            placeholder='OTP'
            ref={otpRef}
            />
            <button className="bg-[#0d1b2a] text-white p-1 rounded-md" onClick={copytoClipboard}>copy</button>
          </div>
          <div className="flex gap-3 mt-4">
            <div className="flex gap-3">
              <input type="range" min={6} max={30} id="length" value={length}onChange={(e)=>{setLength(e.target.value)}}/>
              <label htmlFor="length">Length: {length}</label>                  
            </div>
            <div>
              <input type="checkbox" id="number" defaultChecked = {numberAllowed}onChange={() => setNumberAllowed((prev) => !prev)}/>
              <label htmlFor="number">Number</label>
            </div>
            <div>
              <input type="checkbox" id="char" defaultChecked = {charAllowed} onChange={()=> setCharAllowed((prev)=>!prev)}/>
              <label htmlFor="char">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
