import React, { Component } from 'react'
import { creators } from './CreatorsData.js'

export default class AboutUs extends Component {
    render() {
        return (
            <section className='bios'>
                {creators.map(creator => 
                    <span key={creator.name}>
                    <img src={creator.image} alt={creator.name}/>
                    <div>{creator.name}</div>
                    <div>{creator.bio}</div>
                    </span>
                )
                }
            </section>
        )
    }
}
