import React, { Component } from 'react'
import { creators } from './CreatorsData.js'
import './AboutUs.css'

export default class AboutUs extends Component {
    render() {
        return (
            <section className='bios-page'>
            <h1>TEAM PARKS</h1>
            <section className='bios'>
                {creators.map(creator => 
                    <span key={creator.name}>
                    <img src={creator.image} alt={creator.name}/>
                    <section>
                    <p>{creator.name}</p>
                    <p>{creator.title}</p>
                    <p>{creator.bio}</p>
                    <p>{creator.park}</p>
                    </section>
                    </span>
                )
                }
                </section>
            </section>
        )
    }
}
