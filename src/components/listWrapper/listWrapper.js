import React, {useState, useRef} from 'react';
import ListItem from '../listItem/listItem';

import './listWrapper.css';

let counter = 1;

const ListWrapper = () => {

    const [friendDetails,
        setFriendDetails] = useState([
        {
            id: counter,
            name: 'Jatin Chavan',
            isStarred: false
        }
    ]);

    const [searchKey,
        setSearchKey] = useState('');

    const inputRef = useRef();

    const keyPressHandler = event => {
        if (event.key === 'Enter') {
            const index = friendDetails.findIndex(friend => friend.name.toLowerCase() === inputRef.current.value.toLowerCase());
            if (index >= 0) {
                alert('Friend already exist!')
            } else {
                setFriendDetails([
                    ...friendDetails, {
                        id: ++counter,
                        name: inputRef.current.value,
                        isStarred: false
                    }
                ]);
                inputRef.current.value = '';
                setSearchKey('');
            }
        }
    };

    const deleteHandler = id => {
        if (window.confirm('Are you sure?')) {
            const newArray = friendDetails.filter(friend => friend.id !== id);
            setFriendDetails(newArray);
        }
    };

    const starHandler = id => {
        const index = friendDetails.findIndex(item => item.id === id);
        let newArray = [...friendDetails];
        newArray[index] = {
            ...newArray[index],
            isStarred: !newArray[index].isStarred
        }

        setFriendDetails(newArray);
    }

    const searchHandler = event => {
        setSearchKey(event.target.value);
    }

    return (
        <React.Fragment>
            <input
                placeholder="Enter your friend's name to search or add"
                onKeyPress={keyPressHandler}
                ref={inputRef}
                onChange={searchHandler}></input>
            {friendDetails.filter(item => item.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1).sort((a, b) => {
                if (a.isStarred === true) 
                    return -1;
                return 0
            }).map(friend => <ListItem
                key={friend.id}
                name={friend.name}
                isStarred={friend.isStarred}
                id={friend.id}
                deleteHandler={deleteHandler}
                starHandler={starHandler}/>)
            }
        </React.Fragment>
    )
}

export default ListWrapper;