import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import axios from 'axios'
import { connect } from 'react-redux'

let URL = "https://rickandmortyapi.com/api"

 function Home({chars}) {

    function renderCharacter() {
        let char = chars[2]
        return (
            <Card {...char}/>
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
        chars:state.characters.array
    }
}

export default connect(mapState)(Home)