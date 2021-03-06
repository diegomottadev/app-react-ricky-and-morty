import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import {removeCharacterAction,addFavoritesAction} from '../../redux/charsDuck'
let URL = "https://rickandmortyapi.com/api"

 function Home({chars,removeCharacterAction,addFavoritesAction}) {

    function addFavorites(){
        addFavoritesAction()
    }

    function nextCharacter(){
        removeCharacterAction();
    }

    function renderCharacter() {
        let char = chars[0];
        return (
            <Card   leftClick={nextCharacter} 
                    rightClick={addFavorites} 

                {...char}/>
        )
    }



    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}
//entrega todo el store a las props del componenter
function mapState(state){
    //que le saco a redux
    return {
        chars: state.characters.array
    }
}
//le pasa las acciones mediante esta forma :removeCharacterAction y asi podemos usarlo como prop tmb    
export default connect(mapState,{removeCharacterAction,addFavoritesAction})(Home)