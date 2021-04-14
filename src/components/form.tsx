import axios, { AxiosResponse } from 'axios';
import { FormEvent, useState } from 'react';
import styles from '../styles/components/form.module.css';

export default function Form() {
  const [ name, setName ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ phone, setPhone ] = useState<string>('')
  const [ addressZip, setAddressZip ] = useState<string>('')
  const [ addressStreet, setAddressStreet ] = useState<string>('')
  const [ addressNumber, setAddressNumber ] = useState<string>('')
  const [ addressComplement, setAddressComplement ] = useState<string>('')
  const [ addressDistrict, setAddressDistrict ] = useState<string>('')
  const [ addressCity, setAddressCity ] = useState<string>('')
  const [ addressState, setAddressState ] = useState<string>('')

  const [ formState, setFormState ] = useState<string>('incomplete')


  async function handleForm(event: FormEvent) {
    event.preventDefault();
    setFormState('loading')

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('addressZip', addressZip);
    data.append('addressStreet', addressStreet);
    data.append('addressNumber', addressNumber);
    data.append('addressComplement', addressComplement);
    data.append('addressCity', addressCity);
    data.append('addressDistrict', addressDistrict);
    data.append('addressState', addressState);

    const regex = /\D/g;

    const cep = addressZip.replace(regex, "")
    const telNumber = phone.replace(regex, "")


    axios({
      method: 'post',
      url: 'https://simple-api-selection.herokuapp.com/submit',
      data: {
        "name": `${name}`,
        "email": `${email}`,
        "phone": `${telNumber}`,
        "addressZip": `${cep}`,
        "addressStreet": `${addressStreet}`,
        "addressNumber": `${addressNumber}`,
        "addressComplement": `${addressComplement}`,
        "addressDistrict": `${addressDistrict}`,
        "addressCity": `${addressCity}`,
        "addressState": `${addressState}`,
      }
    }).catch(err => {
      console.log(err)
      setFormState('failed')
    }).then((res: AxiosResponse) => {
      if(res.status == 200) {
        setFormState('success')
      }
  
    })
  
    

  }

  return (
    <div className={styles.container}>
      <form style={formState == 'incomplete' ? {} : {display: 'none'}} onSubmit={handleForm}>
        <fieldset>
          <legend>Formulário de adesivos</legend>

          <div className={styles.lineContainer}>
            <div className={styles.inputBlock}>
              <label htmlFor="name">Nome completo</label>
              <input 
                id="name"
                value={name}
                onChange= { e => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.twoLineContainer}>
            <div className={styles.inputBlock}>
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                type="email"
                value={email}
                onChange= { e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                value={phone}
                onKeyUp= {e => {
                  e.currentTarget.maxLength = 15;
                  let value = e.currentTarget.value;
                  value = value.replace(/\D/g, '')
                  value = value.replace(/(\d{2})(\d{5})(\d)/, "($1) $2-$3")
                  e.currentTarget.value = value;
                }}
                onChange= { e => setPhone(e.target.value)}
                placeholder="(99) 99999-9999"
                required
              />
            </div>
          </div>

          <div className={styles.twoLineContainer}>
            <div className={styles.inputBlock}>
              <label htmlFor="addressZip">CEP</label>
              <input 
                id="addressZip"
                value={addressZip}
                onKeyUp = { e => {
                  e.currentTarget.maxLength = 15;
                  let value = e.currentTarget.value;
                  value = value.replace(/\D/g, '')
                  value = value.replace(/(\d{5})(\d)/, "$1-$2")
                  e.currentTarget.value = value;

                  
                }}
                onChange={ e => setAddressZip(e.target.value)}
                placeholder="99999-999"
                required
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="addressStreet">Rua</label>
              <input 
                id="addressStreet"
                value={addressStreet}
                onChange= { e => setAddressStreet(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.twoLineContainer}>
            <div className={styles.inputBlock}>
              <label htmlFor="addressNumber">Número</label>
              <input 
                id="d"
                value={addressNumber}
                onChange= { e => setAddressNumber(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="addressComplement">Complemento</label>
              <input 
                id="addressComplement"
                value={addressComplement}
                onChange= { e => setAddressComplement(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.twoLineContainer}>

            <div className={styles.inputBlock}>
              <label htmlFor="addressDistrict">Bairro</label>
              <input 
                id="addressDistrict"
                value={addressDistrict}
                onChange= { e => setAddressDistrict(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="addressCity">Cidade</label>
              <input 
                id="addressCity"
                value={addressCity}
                onChange= { e => setAddressCity(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputBlock}>
              <label htmlFor="addressState">Estado</label>
              <input 
                id="addressState"
                value={addressState}
                onChange= { e => setAddressState(e.target.value)}
                required
              />
            </div>

          </div>

          <button type="submit">ENVIAR</button>
        </fieldset>
      </form>

      <div style={formState == 'loading' ? {} : {display: 'none'}} className={styles.loadingContainer}>
        <h1>Seu formulário está sendo enviado, aguarde...</h1>
      </div>

      <div style={formState == 'failed' ? {} : {display: 'none'}} className={styles.loadingContainer}>
        <h1>Seu formulário não foi enviado, <a href='/'>recarregue a página</a> para tentar novamente.</h1>
      </div>

      <div style={formState == 'success' ? {} : {display: 'none'}} className={styles.loadingContainer}>
        <h1>Muito bom! Você receberá seus adesivos em alguns dias.</h1>
      </div>


    </div>
  )
}