import React from 'react';
import { useSelector } from 'react-redux';

import BookMarkedCard from './BookMarkedCard';

function BookmarkSaved(){
    const bookmark  = useSelector( state => state.bookmark ) ;

    return (
         <>
        {
            bookmark?.map( (item) => {
                return <BookMarkedCard key={item.id} />
            } )
        }
       </>
    )
}


export default BookmarkSaved;