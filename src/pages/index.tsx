import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Form from '../components/form'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Formulário de Adesivos</title>
        
      </Head>

      <Form />
      

    </div>
  )
}
