import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import axios from 'axios'
import { connect } from 'react-redux'

let URL = "https://rickandmortyapi.com/api"

 function Home() {

    function renderCharacter() {
        //let char = chars[0]
        return (
            <Card />
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

export default connect()(Home)