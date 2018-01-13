import React from 'react';

class Register extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentTab: 2,
      errorForm: false,
      fields:[]
    }

    this.changeTab = this.changeTab.bind(this)
  }

  changeTab() {
    
  }

  closeInfoMsg(){
    document.querySelector('.infoContainer').classList.remove('showInfo')
  }

  render() {
    return (
      <div className={'mainRegister'}>
        <ul className={'tabList'}>
          <li className={(this.state.currentTab === 1) ? 'tab active' : 'tab'}>1</li>
          <li className={(this.state.currentTab === 2) ? 'tab active' : 'tab'}>2</li>
          <li className={(this.state.currentTab === 3) ? 'tab active' : 'tab'}>3</li>
          <li className={(this.state.currentTab === 4) ? 'tab active' : 'tab'}>4</li>
        </ul>
        <div className={'tabContainer'}>
        <div className={(this.state.currentTab === 1) ? 'tabContent active' : 'tabContent'}>
            tab 1
          </div>
          <div className={(this.state.currentTab === 2) ? 'tabContent active' : 'tabContent'}>
            <div className={'infoContainer showInfo'}>
              <div className={'infoForm'}>
                <p>
                  <span>!</span> Preenchimento obrigatório
                </p>
                <p>
                  <span>&times;</span> Preencimento inválido
                </p>
                <span className={'closeInfo'} onClick={this.closeInfoMsg}></span>
              </div>
            </div>
            <div className={'formContainer'}>
              <div className={'formColl left'}>
                <h2>Informações pessoais</h2>
                <form>
                  <div className={'formFieldSet'}>
                    <h4>Complete os dados abaixo</h4>
                    <div className={'formRow'}>
                      <div className={'inputData'}>
                        <label>Nome</label>
                        <input type="text" name="nome" />
                      </div>
                      <div className={'inputData ok-data'}>
                        <label>Sobrenome</label>
                        <input type="text" name="nome" />
                      </div>
                    </div>
                    <div className={'formRow'}>
                      <div className={'inputData error-data'}>
                        <label>Apelido</label>
                        <input type="text" name="nome" />
                      </div>
                      <div className={'inputData empty-data'}>
                        <label>Celular</label>
                        <input type="text" name="nome" />
                      </div>
                    </div>
                  </div>
                  <div className={'formFieldSet'}>
                    <h4>Confirme seu endereço de entrega</h4>
                    <div className={'formRow'}>
                      <div className={'inputData'} style={{width:'65%'}}>
                        <label>Logradouro</label>
                        <input type="text" name="nome" />
                      </div>
                      <div className={'inputData ok-data'} style={{width:'35%'}}>
                        <label>Número</label>
                        <input type="text" name="nome" />
                      </div>
                    </div>
                    <div className={'formRow'}>
                      <div className={'inputData error-data'} style={{width:'80%'}}>
                        <label>Complemento</label>
                        <input type="text" name="nome" />
                      </div>
                      <div className={'inputData empty-data'} style={{width:'20%'}}>
                        <label>UF</label>
                        <div className={'selectField'}>
                          <select>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={'formRow'}>
                      <div className={'inputData error-data'} style={{width:'55%'}}>
                        <label>Cidade</label>
                        <div className={'selectField'}>
                          <select>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'formFieldSet'}>
                    <div className={'checkboxData'}>
                      <label>
                        <input type="checkbox" />
                        <span className={'checkboxField'}></span>
                        Quero receber as novidades da Centauro.
                      </label>
                    </div>
                    <div className={'checkboxData'}>
                      <label>
                        <input type="checkbox" />
                        <span className={'checkboxField'}></span>
                        Eu aceito os <a href="#">Termos de Uso e Privacidade</a>
                      </label>
                    </div>
                    <div className={'checkboxData error-data'}>
                      <label>
                        <input type="checkbox" />
                        <span className={'checkboxField'}></span>
                        Eu aceito os <a href="#">Termos de Uso e Privacidade</a>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className={'formColl right'}>
                <h2>Detalhes da Compra</h2>
                <h3>
                  R$ 660,00 <span>em até 5x</span>
                </h3>
                <strong>Você terá direito a:</strong>
                <ul>
                  <li>
                    <b>01</b> tênis especial para corrida
                  </li>
                  <li>
                    <b>05</b> peças de vestuário para você correr melhor
                  </li>
                  <li>
                    <b>05</b> acessórios para ajudar no seu desempenho
                  </li>
                  <li>
                    Acompanhamento personalizado de profissionais de treino
                  </li>
                  <li>
                    Apoio com dicas de nutrição
                  </li>
                  <li>
                    Acesso exclusivo ao conteúdo do app <b>EXP_</b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={(this.state.currentTab === 3) ? 'tabContent active' : 'tabContent'}>
            tab 3
          </div>
          <div className={(this.state.currentTab === 4) ? 'tabContent active' : 'tabContent'}>
            tab 4
          </div>
        </div>
      </div>
    )
  }
}

export default Register
