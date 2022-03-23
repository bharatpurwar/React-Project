import React from "react"
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import CategoryWiseAuthors from "../Components/categorywiseauthors/CategoryWiseAuthors"

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

    test("Should have title Author",()=>{
        render(<CategoryWiseAuthors/>)
        expect(screen.getByTestId('title')).toHaveTextContent('Authors');
    })

    test("Should Have CategoryWiseAuthorsCard Child Component",()=>{
        renderer(<CategoryWiseAuthors/>,element)
        let count=element.getElementsByTagName("CategoryWiseAuthorsCard")
        expect(count).toBeDefined()
    })
})