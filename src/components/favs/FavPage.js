import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux'

  function FavPage({ characters = [0] }) {
    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {characters.map(renderCharacter)}
            {!characters.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}

//entrega todo el store a las props del componenter
function mapState({characters   }){
    //que le saco a redux
    return {
        favs: characters.favorites
    }
}
//le pasa las acciones mediante esta forma :removeCharacterAction y asi podemos usarlo como prop tmb    
export default connect(mapState,{})(FavPage)