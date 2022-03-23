import React from 'react'
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
//import '@testing-library/jest-dom/extend-expect';
import Login from '../Components/login/Login'

describe('Login Component TestCases', () => {
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

    test('Should Login Have Rendering', () => {
      render(<Login />);
    });

    test('Should have two input in Login component', () => {
      renderer(<Login />, element);
      const count = element.getElementsByTagName('input').length;
      expect(count).toBe(2);
    });

    test('Should have login text on button of Login Component', () => {
      render(<Login />);
      expect(screen.getByTestId('loginBtn')).toHaveTextContent('Log in');
    });
      
    test('should have row class on all textfields', () => {
      render(<Login />,element);
      const links=element.getElementsByTagName('input');
      for(let i=1;i<links.length;i++){
        expect(links[i]).toHaveClass('row');
      }
    })

    test('should have 3 Another Ways to Login', () => {
      renderer(<Login />,element)
      const count=element.getElementsByTagName('a').length;
      expect(count).toBe(3);
    }) 
})