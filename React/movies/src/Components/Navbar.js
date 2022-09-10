import React, { Component } from 'react'

export default class  extends Component {
  render() {
    return (
      <div style={{display:'flex',background:'white',color:'lightblue',padding:'1em',justifyContent:'center',alignItems:'center'}}>
        <h1>Movies app</h1>
        <h2 style={{marginLeft:'2rem'}}> Favorites </h2>
      </div>
    )
  }
}
