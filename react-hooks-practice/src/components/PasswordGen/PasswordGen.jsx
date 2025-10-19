import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PasswordGen.css";

const Passwordgen = () => {
    const [length, setLength] = useState(8);
    const [allowNumber, setAllowNumber] = useState(false);
    const [allowChar, setAllowChar] = useState(false);
    const [password, setPassword] = useState("");
    const passRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (allowNumber) str += "0123456789";
        if (allowChar) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [allowNumber, allowChar, length]);

    const copyPasswordToClipboard = useCallback(() => {
        passRef.current?.select();
        window.navigator.clipboard.writeText(password);
        setShowPopup(true);
    }, [password]);

    useEffect(() => {
        passwordGenerator();
    }, [allowNumber, allowChar, length, passwordGenerator]);


    return (
        <main className="PassGenPage">
            <h1>Password Generator</h1>
            <div className="container">
                <div className="row1 row">
                    <input type="text" readOnly value={password} ref={passRef} />
                    <button onClick={copyPasswordToClipboard}>Copy</button>
                </div>

                <div className="row2 row">
                    <label>
                        <input
                            type="range"
                            min={6}
                            max={80}
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <span>{length}</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={allowNumber}
                            onChange={() => setAllowNumber((prev) => !prev)}
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={allowChar}
                            onChange={() => setAllowChar((prev) => !prev)}
                        />
                        Special Characters
                    </label>
                </div>
                <strong>Mini project using UseState, UseEffect , UseRef, UseCallback</strong>

                
            </div>
        </main>
    );
};

export default Passwordgen;