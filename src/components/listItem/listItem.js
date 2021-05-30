import React from 'react';
import './listItem.css'

const ListItem = ({name, isStarred, deleteHandler, starHandler, id}) => (
    <li className="list">
        <p>{name
                ? name
                : 'No Name'}
            <br/>
            <span>is your friend</span>
        </p>
        <div className='buttons'>
            <button
                className={isStarred
                ? 'star highlight'
                : 'star'}
                onClick={() => starHandler(id)}>&#9734;</button>
            <button className='delete-icon' onClick={() => deleteHandler(id)}>&#x1f5d1;</button>
        </div>
    </li>
);

export default ListItem;