import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  let [length, setlength] = useState(8);
  let [includeNumb, setincludeNumb] = useState(false);
  let [includeChars, setincludeChars] = useState(false);
  let [password, setpassword] = useState("");

  let generatePassword = useCallback(() => {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()";
    let allChars = letters;
    let pass = [];

    if (includeNumb) {
      pass.push(numbers[Math.floor(Math.random() * numbers.length)]);
      allChars += numbers;
    }

    if (includeChars) {
      pass.push(symbols[Math.floor(Math.random() * symbols.length)]);
      allChars += symbols;
    }

    pass.push(letters[Math.floor(Math.random() * letters.length)]);

    while (pass.length < length) {
      pass.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    for (let i = pass.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [pass[i], pass[j]] = [pass[j], pass[i]];
    }

    setpassword(pass.join(""));
  }, [length, includeNumb, includeChars]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  let inputref = useRef();

  let handleCopy = () => {
    inputref.current.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-6 font-sans">
      <div className="w-full max-w-md bg-[#1f1f1f] text-white p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-cyan-400">
          PassGen 🔒
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={inputref}
            type="text"
            placeholder="Generated Password"
            className="flex-1 bg-[#333] text-white rounded-lg px-4 py-2 outline-none placeholder:text-gray-400 text-sm"
            readOnly
            value={password}
          />
          <button
            onClick={handleCopy}
            className="bg-cyan-500 hover:bg-cyan-600 transition duration-200 px-4 py-2 rounded-lg font-semibold text-sm"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label htmlFor="passwordLength" className="font-medium">
              Length: <span className="text-cyan-300">{length}</span>
            </label>
            <input
              id="passwordLength"
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setlength(Number(e.target.value))}
              className="w-full sm:w-[60%] accent-cyan-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="checknum">Include Numbers</label>
            <input
              id="checknum"
              type="checkbox"
              checked={includeNumb}
              onChange={() => setincludeNumb((prev) => !prev)}
              className="accent-cyan-500 w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="checkchar">Include Special Characters</label>
            <input
              id="checkchar"
              type="checkbox"
              checked={includeChars}
              onChange={() => setincludeChars((prev) => !prev)}
              className="accent-cyan-500 w-4 h-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
