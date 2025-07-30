import { useState } from 'react'
import { fakeLogin } from '../api'

// google
// useFormStatus , you can track form status
// useOptimistic , after cicking on the form and before request

// just use = for contexts, promises. instead of UseState defining and UseEffect with async fetch inside we can change to use. 
// we can fetch before using "use" like:
//  const fetchUsers = fetch('blabla').then((r) => r.json()) 
// 
// and in the function wirte
// const users = use (fetchUsers

// useRef = for references, to send references 

export default function AuthForm() {
  const [pending, setPending] = useState(false)
  // const [password, setPassword] = useState('')
  // const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [result, setResult] = useState('')

  const handleSubmit = async (e) => {
    // e.preventDefault()
    e.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(e.target);
    
// FOR FORM DATA WE NEED TO WRITE NAME IN THE EVEY INPUT
// then we can delete VALUE and ONCHANGE and STATES with email and passwords
// THEN we need to create "formdata.get('somename')"

const email = formData.get('email')
const password = formData.get('password')

    setPending(true)
    setError(null)
    setResult('')

    try {
      await fakeLogin({ email, password })
      setResult('Email ' + email + ' logged in')
    } catch (e) {
      setError(e.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <input
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          className="validate"
          name="email"
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="input-field">
        <input
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
          className="validate"
          name="password"
        />
        <label htmlFor="password">Password</label>
      </div>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? 'Loading...' : 'Submit'}
      </button>
      {result && <p>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}




// return (
//     <form onSubmit={handleSubmit}>
//       <div className="input-field">
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           id="email"
//           type="email"
//           className="validate"
//         />
//         <label htmlFor="email">Email</label>
//       </div>
//       <div className="input-field">
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           id="password"
//           type="password"
//           className="validate"
//         />
//         <label htmlFor="password">Password</label>
//       </div>
//       <button className="btn" type="submit" disabled={pending}>
//         {pending ? 'Loading...' : 'Submit'}
//       </button>
//       {result && <p>{result}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   )