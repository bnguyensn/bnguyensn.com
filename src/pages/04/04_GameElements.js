import React, {Component} from 'react';

function AnswerCard(props) {
    return (
        <li className='ans-container'>
            <div className='ans-icon'>
                <img src={props.imgURL} />
            </div>
            <div className='ans-text'>
                <span>{props.text}</span>
            </div>
        </li>
    )
}

function CelebCard(props) {
    const ans_list = props.ans_list.map((ans) =>
        <AnswerCard key={ans.text} imgURL={ans.imgURL} text={ans.text} />
    );

    return (
        <div className='celeb-card-container'>
            <div className='celeb-img'>
                <img src={props.imgURL} />
            </div>
            <ul className='ans-list'>
                {ans_list}
            </ul>
        </div>
    )
}

module.exports = {
    AnswerCard: AnswerCard,
    CelebCard: CelebCard
};