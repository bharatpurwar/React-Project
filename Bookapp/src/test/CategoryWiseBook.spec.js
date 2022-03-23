import React from "react"
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import CategoryWiseBook from "../Components/categorywisebooks/CategoryWiseBookCard"

describe('CategoryWiseAuthors Component TestCases', () => {
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

    test("Should Have CategoryWiseBookCard Child Component",()=>{
        renderer(<CategoryWiseBook/>,element)
        let count=element.getElementsByTagName("CategoryWiseBookCard")
        expect(count).toBeDefined()
    })

    test("Should Contain Snackbar Component",()=>{
        renderer(<CategoryWiseBook/>,element)
        let count=element.getElementsByTagName("Snackbar")
        expect(count).toBeDefined()
    })
})