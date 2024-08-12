import React from 'react'
import './TitleCard.css'

const TitleCard = ({ name }) => {
    return (
        <div className="text-center">
            <p className="title-card mb-5" data-text="Awesome">
                <span className="actual-text">&nbsp;{name}&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;{name}&nbsp;</span>
            </p>
        </div>
    )
}

export default TitleCard
