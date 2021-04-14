import { FormEvent, useState } from 'react';
import { api } from '../services/api';
import styles from '../styles/components/form.module.css';

export default function Form() {
  const [ name, setName ] = useState<string>()
  const [ email, setEmail ] = useState<string>()
  const [ phone, setPhone ] = useState<string>()
  const [ addressZip, setAddressZip ] = useState<string>()
  const [ addressStreet, setAddressStreet ] = useState<string>()
  const [ addressNumber, setAddressNumber ] = useState<string>()
  const [ addressComplement, setAddressComplement ] = useState<string>()
  const [ addressDistrict, setAddressDistrict ] = useState<string>()
  const [ addressCity, setAddressCity ] = useState<string>()
  const [ addressState, setAddressState ] = useState<string>()

  const [ formState, setFormState ] = useState<string>('incomplete')

  async function handleForm(event: FormEvent) {
    event.preventDefault();

    // const data = {
    //   name: name,
    //   email: email,
    //   phone: phone,
    //   addressZip: addressZip,
    //   addressStreet: addressStreet,
    //   addressNumber: addressNumber,
    //   addressDistrict: addressComplement, 
    //   addressCity: addressCity, 
    //   addressState: addressDistrict,
    // }

    // data.name = name
    // data.email = email
    // data.phone = phone
    // data.addressZip = addressZip
    // data.addressStreet = addressStreet
    // data.addressNumber = addressNumber
    // // data.addressComplement = addressComplement 
    // data.addressCity = addressCity  
    // data.addressDistrict = addressDistrict
    // data.addressState = addressState

    let data = new FormData();

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

    // if(data) {
    //   console.log(data.values);
    // }
    console.log(data)
    await api.post('submit', data).catch(error => {
      console.log(error)
    }).then(res => {
      console.log(res)
    })



    // console.log(response);

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
                onChange= { e => setPhone(e.target.value)}
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
                onChange= { e => setAddressZip(e.target.value)}
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


    </div>
  )
}