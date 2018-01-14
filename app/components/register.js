import React from 'react';

class Register extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentTab: 2,
      errorForm: false,
      cities:[],
      fields:[
        {
          name:'nome',
          required:'empty',
          value:'',
          errors:''
        },
        {
          name:'sobrenome',
          required:'empty',
          value:'',
          errors:''
        },
        {
          name:'apelido',
          required:false,
          value:'',
          errors:''
        },
        {
          name:'celular',
          required:'phone',
          value:'',
          errors:''
        },
        {
          name:'logradouro',
          required:'empty',
          value:'',
          errors:''
        },
        {
          name:'numero',
          required:'empty',
          value:'',
          errors:''
        },
        {
          name:'complemento',
          required:false,
          value:'',
          errors:''
        },
        {
          name:'uf',
          required:'empty',
          value:'',
          errors:''
        },
        {
          name:'cidade',
          required:'empty',
          value:'',
          errors:''
        },
        {
          name:'novidades',
          required:false,
          value:true,
          errors:''
        },
        {
          name:'termos',
          required:'checkbox',
          value:false,
          errors:''
        }
      ]
    }

    this.changeField = this.changeField.bind(this)
    this.checkFields = this.checkFields.bind(this)
    this.nextFormStep = this.nextFormStep.bind(this)
  }

  changeField(event){
    let eventData = {
      name: event.target.name,
      value: (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    }

    let changedField = this.state.fields.map(function(field){
      let nStateData = field
      
      if(this.name === field.name){
        nStateData.value = this.value
      }

      return nStateData
    }, {name:eventData.name, value:eventData.value})

    if(eventData.name == 'uf'){
      this.getCities(eventData.value)
    }

    this.setState({
      fields: changedField
    }, function(){
      this.checkFields(eventData.name)
    })
  }

  getCities(region){
    if(!region){
      return
    }

    let apiCities = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ region +'/municipios';

    $.ajax({
      method:'GET',
      url:apiCities,
      success: function(data){
        let citiesMap = data.map(function(citie){
          return {
            name: citie.nome,
            value: citie.id
          }
        })

        this.setState({
          cities: citiesMap
        }, function(){
          this.resetValue('cidade')
        })
      }.bind(this)
    })
  }

  checkFields(fieldName){
    let hasErros = false;
    let checkers = {
      phone: function(value){
        let errors = '' 
        
        if(value.replace(/\D+/g, '').length !== 11){
          errors = 'error-data';
        }else if(value === ''){
          errors = 'empty-data';
        }

        return errors
      },
      empty: function(value){
        return (value === '') ? 'empty-data' : '' ;
      },
      checkbox: function(value){
        return (value === false) ? 'empty-data' : '' ;
      }
    }

    let changedField = this.state.fields.map(function(field){
      let nStateData = field

      if(this.fieldName === field.name || this.fieldName === true){
        if(field.required){
          let isValidField = checkers[field.required](field.value)
          nStateData.errors = (!isValidField) ? 'ok-data' : isValidField ;
        }else if(field.value !== ''){
          nStateData.errors = 'ok-data'
        }
      }
      
      if(field.errors === 'ok-data'){
        nStateData.errors = (field.value === '') ? '' : 'ok-data' ;
      }else{
        if(!hasErros){
          hasErros = true
        }
      }

      return nStateData
    }, {fieldName: fieldName})

    if(hasErros){
      document.querySelector('.infoContainer').classList.add('showInfo')
    }else{
      document.querySelector('.infoContainer').classList.remove('showInfo')
    }

    this.setState({
      fields: changedField
    }, function(){
      if(fieldName === true){
        return hasErros
      }
    })
  }

  nextFormStep(tabIndex){
      this.setState({
        currentTab: tabIndex
      })
  }

  submitForm(event){
    event.preventDefault()

    let hasErros = this.checkFields(true)

    if(!hasErros){
      this.nextFormStep(3)
    }
  }

  resetValue(fieldName){
    let nStateValue = this.state.fields.map(function(field){
      let currentState = field

      if(currentState.name === this.fieldName){
        currentState.value = ''
        currentState.errors = ''
      }

      return currentState
    }, {fieldName: fieldName})

    this.setState({
      fields: nStateValue
    })
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
            <div className={'infoContainer'}>
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
                <form onSubmit={this.submitForm}>
                  <div className={'formFieldSet'}>
                    <h4>Complete os dados abaixo</h4>
                    <div className={'formRow'}>
                    <div className={(this.state.fields[0].errors) ? 'inputData '+ this.state.fields[0].errors : 'inputData'}>
                        <label>Nome</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[0].value} name="nome" />
                      </div>
                      <div className={(this.state.fields[1].errors) ? 'inputData '+ this.state.fields[1].errors : 'inputData'}>
                        <label>Sobrenome</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[1].value} name="sobrenome" />
                      </div>
                    </div>
                    <div className={'formRow'}>
                      <div className={(this.state.fields[2].errors) ? 'inputData '+ this.state.fields[2].errors : 'inputData'}>
                        <label>Apelido</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[2].value} name="apelido" />
                      </div>
                      <div className={(this.state.fields[3].errors) ? 'inputData '+ this.state.fields[3].errors : 'inputData'}>
                        <label>Celular</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[3].value} name="celular" />
                      </div>
                    </div>
                  </div>
                  <div className={'formFieldSet'}>
                    <h4>Confirme seu endereço de entrega</h4>
                    <div className={'formRow'}>
                      <div className={(this.state.fields[4].errors) ? 'inputData '+ this.state.fields[4].errors : 'inputData'} style={{width:'65%'}}>
                        <label>Logradouro</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[4].value} name="logradouro" />
                      </div>
                      <div className={(this.state.fields[5].errors) ? 'inputData '+ this.state.fields[5].errors : 'inputData'} style={{width:'35%'}}>
                        <label>Número</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[5].value} name="numero" />
                      </div>
                    </div>
                    <div className={'formRow'}>
                      <div className={(this.state.fields[6].errors) ? 'inputData '+ this.state.fields[6].errors : 'inputData'} style={{width:'75%'}}>
                        <label>Complemento</label>
                        <input type="text" onChange={this.changeField} value={this.state.fields[6].value} name="complemento" />
                      </div>
                      <div className={(this.state.fields[7].errors) ? 'inputData '+ this.state.fields[7].errors : 'inputData'} style={{width:'25%'}}>
                        <label>UF</label>
                        <div className={'selectField'}>
                          <select onChange={this.changeField} value={this.state.fields[7].value} name="uf">
                            <option value="11">RO</option>
                            <option value="12">AC</option>
                            <option value="13">AM</option>
                            <option value="14">RR</option>
                            <option value="15">PA</option>
                            <option value="16">AP</option>
                            <option value="17">TO</option>
                            <option value="21">MA</option>
                            <option value="22">PI</option>
                            <option value="23">CE</option>
                            <option value="24">RN</option>
                            <option value="25">PB</option>
                            <option value="26">PE</option>
                            <option value="27">AL</option>
                            <option value="28">SE</option>
                            <option value="29">BA</option>
                            <option value="31">MG</option>
                            <option value="32">ES</option>
                            <option value="33">RJ</option>
                            <option value="35">SP</option>
                            <option value="41">PR</option>
                            <option value="42">SC</option>
                            <option value="43">RS</option>
                            <option value="50">MS</option>
                            <option value="51">MT</option>
                            <option value="52">GO</option>
                            <option value="53">DF</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={'formRow'}>
                      <div className={(this.state.fields[8].errors) ? 'inputData '+ this.state.fields[8].errors : 'inputData'} style={{width:'55%'}}>
                        <label>Cidade</label>
                        <div className={'selectField'}>
                          <select onChange={this.changeField} value={this.state.fields[8].value} name="cidade">
                            {this.state.cities.map(function(citie, idx){
                              return (<option key={idx} value={citie.value}>{citie.name}</option>)
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'formFieldSet'}>
                    <div className={(this.state.fields[9].errors) ? 'checkboxData '+ this.state.fields[9].errors : 'checkboxData'}>
                      <label>
                        <input onChange={this.changeField} type="checkbox" checked={this.state.fields[9].value} name="novidades" />
                        <span className={'checkboxField'}></span>
                        Quero receber as novidades da Centauro.
                      </label>
                    </div>
                    <div className={(this.state.fields[10].errors) ? 'checkboxData '+ this.state.fields[10].errors : 'checkboxData'}>
                      <label>
                        <input onChange={this.changeField} type="checkbox" checked={this.state.fields[10].value} name="termos" />
                        <span className={'checkboxField'}></span>
                        Eu aceito os <a href="#">Termos de Uso e Privacidade</a>
                      </label>
                    </div>
                  </div>
                  <div className={'formFieldSet'}>
                    <button className={'btnNavTabs back'} onClick={() => {this.nextFormStep(1)}}>Voltar</button>
                    <button className={'btnNavTabs next'} onClick={() => {this.nextFormStep(3)}}>Continuar</button>
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
