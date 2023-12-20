import { Post } from "./Post1"
import { Header } from "./components/Header"

import styles from './App.module.css'
import './global.css'

export function App() {

  return (
    <div>
      <Header />

      <div className={ styles.wrapper }>
        <aside>
          sidebar
        </aside>
        <main>
          <Post 
            author='Arnaldo Junior' 
            content='Loren ipsun dolor sit amet consectetur...'
          />

          <Post 
            author='Diego Fernandes' 
            content='Aulas de ignites'
          />
        </main>
      </div>

    </div>
  )
}
