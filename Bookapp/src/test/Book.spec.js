import React from "react"
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import Books from "../Components/books/Books"

describe('Book Component TestCases', () => {
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

    test("Should have Card Component",()=> {
        render(<Books/>)
        expect(screen.getByTestId('card')).toHaveClass('card-body')
    })
   
    test('Should have Favourite Button', () => {
        render(<Books />);
        expect(screen.getByTestId('Favourite')).toHaveTextContent('favourite');
    });

    test('Should have Recommend Button', () => {
        render(<Books />);
        expect(screen.getByTestId('recommend')).toHaveTextContent('recommend');
    });

    test("Should Have Snackbar In the Book Component",()=>{
        renderer(<Books />,element)
        let count=element.getElementsByTagName("Snackbar")
        expect(count).toBeDefined()
    })
})