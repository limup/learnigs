import { Post } from "./Post1"
import { Header } from "./components/Header"

import './global.css'

export function App() {

  return (
    <div>
      <Header />

      <Post 
        author='Arnaldo Junior' 
        content='Loren ipsun dolor sit amet consectetur...'
      />

      <Post 
        author='Diego Fernandes' 
        content='Aulas de ignites'
      />
    </div>
  )
}
