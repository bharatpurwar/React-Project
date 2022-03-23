import React from 'react'
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
//import '@testing-library/jest-dom/extend-expect';
import Register from '../Components/register/Register'

describe('Register Component TestCases', () => {
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

    test('Should Register Have Rendering', () => {
        render(<Register />);
    });

    test('should have row class on all textfields', () => {
        render(<Register />,element);
         const links=element.getElementsByTagName('input');
         for(let i=1;i<links.length;i++){
             expext(links[i]).toHaveClass('row');
         }
    })

    test('Should have Six input in Register component', () => {
        renderer(<Register />, element);
        const count = element.getElementsByTagName('input').length;
        expect(count).toBe(6);
    });
      
    test('Should have Register text on button of Register Component', () => {
        render(<Register />);
        expect(screen.getByTestId('registerBtn')).toHaveTextContent('Register');
    });
      
      
})