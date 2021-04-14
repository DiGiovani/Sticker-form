import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Form from '../components/form'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Formulário de Adesivos</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <Form />
      

    </div>
  )
}
