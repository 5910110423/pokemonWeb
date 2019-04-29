import React, { Component } from 'react';
import firebase from '../firebase';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { button, Modal, ModalHeader, ModalBody, ModalFooter,Fade  } from 'reactstrap';
class Content extends Component {
  constructor(){
     super();
     this.state = {
        pokemons:[],
        PokemonName:'',
        pokeID:'',
        name:'',
        persen :'',
        modal: false,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        fadeIn: false,
     }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.pokemonDetail = this.pokemonDetail.bind(this);
    this.pokemonDetail1 = this.pokemonDetail1.bind(this);
    this.pokemonDetail2 = this.pokemonDetail2.bind(this);
    this.pokemonDetail3 = this.pokemonDetail3.bind(this);
    this.pokemonDetail4 = this.pokemonDetail4.bind(this);
  }
  pokemonDetail() {
    this.setState({
      fadeIn: !this.state.fadeIn
    })
}
  pokemonDetail1() {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }));
    this.head='Bulbasaur'
    this.information='Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun is rays, the seed grows progressively larger.'
  }

  pokemonDetail2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
    this.head='Pikachu'
    this.information='Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it is evidence that this Pokémon mistook the intensity of its charge.'
  }
  pokemonDetail3() {
    this.setState(prevState => ({
      modal3: !prevState.modal3
    }));
    this.head='Charmander'
    this.information='The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.'
  }
  pokemonDetail4() {
    this.setState(prevState => ({
      modal4: !prevState.modal4
    }));
    this.head='Squirtle'
    this.information='Squirtle is shell is not merely used for protection. The shell is rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.'
  }
  
  componentDidMount(){
    const pokemonsRef = firebase.database().ref('pokemons');
    pokemonsRef.on('value',(snapshot) => {
        let pokemons = snapshot.val();
        let newState = [];
        for(let pokemon in pokemons){
          newState.push({
                user_id:pokemon,
              PokemonName:pokemons[pokemon].PokemonName,
              name:pokemons[pokemon].name,
              persen:pokemons[pokemon].persen
          })
        }
        this.setState({
          pokemons:newState
        })
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(e){
    e.preventDefault();
    var rand = parseInt(Math.random()*10);
        if(this.state.PokemonName==''){
            alert("กรุณาเลือกโปเกมอนที่ต้องการจะจับก่อน");
        }
        else if(this.state.name==''){
            alert("กรุณาใส่ชื่อของผู้จับ");
        }
        else if(rand>=5){
            if(this.state.pokeID != ''){
                return this.updateItem();
              }
            alert("จับโปเกมอนสำเร็จ : "+"ค่าที่สุมได้คือ"+rand);
            const pokemonsRef = firebase.database().ref('pokemons')
            const item = {
                PokemonName : this.state.PokemonName,
                name : this.state.name,
                persen : rand
            }
            pokemonsRef.push(item)
            this.setState({
                pokeID:'',
                PokemonName:'',
                name:'',
                persen:''
            })
            
        }else{
            alert("โปเกมอนหนีไปแล้ว : "+"ค่าที่สุมได้คือ"+rand);
        }
  }
  removeItem(itemId){
    const pokemonsRef = firebase.database().ref('/pokemons');
    pokemonsRef.child(itemId).remove();
 }
 pokemonDetailModal() {    
  this.setState((prev, props) => {
    const newState = !prev.modalState;
    
    return { modalState: newState };
  });
}

  render() {

    return (
      <div className="app">
      <div className="container" style={{marginTop:20}}>

      <form onSubmit={this.handleSubmit} onKeyPress={event => {
      if (event.which === 13) {
        event.preventDefault();
        }
      }}>
            <div class="row text-center">
                <div className="col-md-3">
                    
                <div className="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h2 class="card-text">Bulbasaur</h2>
                    </div>
                    <button type="button" class="btn btn-info btn-lg"onClick={() => this.state.PokemonName='Bulbasaur'}>{this.props.buttonLabel}เลือกฉัน</button> 
                    <button type="button" class="btn btn-warning btn-lg" onClick={this.pokemonDetail1}>{this.props.buttonLabel}รายละเอียด</button>

                </div>
                </div>

                <div className="col-md-3">
                <div className="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h2 class="card-text">Pikachu</h2>
                    </div>
                    <button type="button" class="btn btn-info btn-lg" onClick={() => this.state.PokemonName='Pikachu'}>{this.props.buttonLabel}เลือกฉัน</button> 
                    <button type="button" class="btn btn-warning btn-lg" onClick={this.pokemonDetail2}>{this.props.buttonLabel}รายละเอียด</button>

                </div>
                </div>
                <div className="col-md-3">
                <div className="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h2 class="card-text">Charmander</h2>
                    </div>
                    <button type="button" class="btn btn-info btn-lg"onClick={() => this.state.PokemonName='Charmander'}>{this.props.buttonLabel}เลือกฉัน</button> 
                    <button type="button" class="btn btn-warning btn-lg" onClick={this.pokemonDetail3}>{this.props.buttonLabel}รายละเอียด</button>

                </div>
                </div>
                <div className="col-md-3">
                <div className="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h2 class="card-text">Squirtle</h2>
                    </div>
                    <button type="button" class="btn btn-info btn-lg"  onClick={() => this.state.PokemonName='Squirtle'}>{this.props.buttonLabel}เลือกฉัน</button> 
                    <button type="button" class="btn btn-warning btn-lg" onClick={this.pokemonDetail4}>{this.props.buttonLabel}รายละเอียด</button>

                </div>
                </div>

            </div>

    <div>
        <br/>
                    
                    <Modal isOpen={this.state.modal1} pokemonDetail={this.pokemonDetail1} className={this.props.className}>
                      <ModalHeader pokemonDetail={this.pokemonDetail1}>{this.head}</ModalHeader>
                      <ModalBody>
                        {this.information}
                      </ModalBody>
                    <ModalFooter>
                    
                    <button type="button" class="btn btn-warning" onClick={this.pokemonDetail1}>Exit</button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modal2} pokemonDetail={this.pokemonDetail2} className={this.props.className}>
                      <ModalHeader pokemonDetail={this.pokemonDetail2}>{this.head}</ModalHeader>
                      <ModalBody>
                        {this.information}
                      </ModalBody>
                      <ModalFooter>
                    
                      <button type="button" class="btn btn-warning" onClick={this.pokemonDetail2}>Exit</button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modal3} pokemonDetail={this.pokemonDetail3} className={this.props.className}>
                      <ModalHeader pokemonDetail={this.pokemonDetail3}>{this.head}</ModalHeader>
                      <ModalBody>
                        {this.information}
                      </ModalBody>
                      <ModalFooter>
                    
                      <button type="button" class="btn btn-warning" onClick={this.pokemonDetail3}>Exit</button>
                      </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modal4} pokemonDetail={this.pokemonDetail4} className={this.props.className}>
                      <ModalHeader pokemonDetail={this.pokemonDetail4}>{this.head}</ModalHeader>
                      <ModalBody>
                        {this.information}
                      </ModalBody>
                      <ModalFooter>
                    
                      <button type="button" class="btn btn-warning" onClick={this.pokemonDetail4}>Exit</button>
                      </ModalFooter>
                    </Modal>
                   
    </div>
                    
          <div className="row" >
          <div className="col-md-4">
                
                </div>
            <div className="col-md-4">
                <div class="input-group mb-3">
                <input type="text" name="name" className="form-control" placeholder="ชื่อของเทรนเนอร์" onChange={this.handleChange} value={this.state.name}/>
                <div class="input-group-append">
                <button type="submit" onClick={this.state} class="btn btn-primary">จับโปเกมอน</button>&nbsp;&nbsp;
                </div>
                </div>
            </div>
            <div className="col-md-4">
                
            </div>

            </div>
            <br/>
        <button type="button" class="btn btn-info btn-lg btn-block" onClick={this.pokemonDetail}>โปเกมอนที่จับได้</button>
                <Fade in={this.state.fadeIn}>
                <table className="table table-hover">
                    <tr className="thead-light">
                      <th width="20%">PokemonName</th>
                      <th width="20%">trainerName</th>
                      <th width="55%">persen</th>
                      <th width="5%">Delete</th>
                    </tr>
                    {
                        this.state.pokemons.map((pokemon) => {
                          return (
                              <tr>
                                <td>{pokemon.PokemonName}</td>
                                <td>{pokemon.name}</td>
                                <td>{pokemon.persen}</td>
                                <td><button className="btn btn-danger btn-md" onClick={() => this.removeItem(pokemon.user_id)}>Delete</button></td>
                              </tr>
                          )
                        })
                    }
                </table>
                </Fade>
            </form>
      </div>
      </div>
    );
  }
}

export default Content;