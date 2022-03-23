import React from 'react'
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import Favourite from "../Components/favourite/Favourite"


describe('Favourite Component TestCases', () => {
    let element='';
    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
    });

    afterEach(()=> {
        unmountComponentAtNode(element);
        element.remove();
        element=null;
    })
    test("Should Have Favourite Child Component",()=>{
        renderer(<Favourite/>,element)
        let count=element.getElementsByTagName("FavouriteCard")
        expect(count).toBeDefined()
    })

    test(" Should have title My Favourite",()=>{
        render(<Favourite/>)
        expect(screen.getByTestId('title')).toHaveTextContent('My Favourites');
    })

})