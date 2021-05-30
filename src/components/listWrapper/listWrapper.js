import React, {useState, useRef} from 'react';
import ListItem from '../listItem/listItem';

import ReactPaginate from 'react-paginate';

import './listWrapper.css';

let counter = 1;

const ListWrapper = () => {

    const [friendDetails,setFriendDetails] = useState([{
            id: counter,
            name: 'Jatin Chavan',
            isStarred: false
        }]);
    const [searchKey, setSearchKey] = useState('');
    const [pageNumber, setPageNumber] = useState(0);

    const inputRef = useRef();

    const usersPerPage = 4;
    const pagesVisited = pageNumber * usersPerPage;

    const keyPressHandler = event => {
        if (event.key === 'Enter') {
            const index = friendDetails.findIndex(friend => friend.name.toLowerCase() === inputRef.current.value.toLowerCase());
            if (index >= 0) {
                alert('Friend already exist.')
            } else if (!inputRef.current.value) {
                alert('Nameless friends not allowed.')
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

    const displayFriends = friendDetails
        .filter(friend => friend.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1)
        .sort((a) => {
            if (a.isStarred === true) 
                return -1;
            return 0
        })
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map(friend => <ListItem
            key={friend.id}
            name={friend.name}
            isStarred={friend.isStarred}
            id={friend.id}
            deleteHandler={deleteHandler}
            starHandler={starHandler}/>);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    return (
        <div className='list-wrapper'>
            <input
                placeholder="Enter your friend's name to search or add"
                onKeyPress={keyPressHandler}
                ref={inputRef}
                onChange={searchHandler}></input>
            {displayFriends}
            <ReactPaginate 
                previousLabel="Prev"
                nextLabel="Next"
                pageCount={Math.ceil(friendDetails.length / usersPerPage)}
                onPageChange={changePage}
                containerClassName="paginationButtons"
                previousLinkClassName="previousButton"
                nextLinkClassName="nextButton"
                disabledClassName="disabledPagination"
                activeClassName="activeButton"
            />
        </div>
    )
}

export default ListWrapper;