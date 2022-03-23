import React from 'react'
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import Recommend from '../Components/recommend/Recommend';

describe('Recommend Component TestCases', () => {
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
        renderer(<Recommend/>,element)
        let count=element.getElementsByTagName("FavouriteCard")
        expect(count).toBeDefined
    })

    test(" Should have title My Recommendation",()=>{
        render(<Recommend/>)
        expect(screen.getByTestId('title')).toHaveTextContent('My Recommendation');
    })

})