import React from "react";
import { render, screen } from '@testing-library/react';
import { render as renderer, unmountComponentAtNode } from "react-dom";
import Dashboard from "../Components/dashboard/Dashboard";

describe('Dashboard Component TestCases', () => {
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

    test("Should Dashboard have rendering", ()=>{
        render(<Dashboard/>)
        });

        test("Should have 5 Different Subjects of Books " ,() => {
            renderer(<Dashboard />,element)
            const count = element.getElementsByTagName('h2').length;
            expect(count).toBeGreaterThanOrEqual(5);
        })

    test("should have Books belongs to Science Fiction Subject",() => {
        render(<Dashboard/>)
        expect(screen.getByTestId("Science")).toBeInTheDocument()
    })

    test("should have Books belong to Romance Subject",() => {
        render(<Dashboard/>)
        expect(screen.getByTestId("Romance")).toBeInTheDocument()
    })

    test("should have Books belongs to Auto BioGraphy Subject",() => {
        render(<Dashboard/>)
        expect(screen.getByTestId("Biography")).toBeInTheDocument()
    })

    test("should have Books belong to Kids Subject",() => {
        render(<Dashboard/>)
        expect(screen.getByTestId("kids")).toBeInTheDocument()
    })

    test("should have Books belong to Humor Comics Subject",() => {
        render(<Dashboard/>)
        expect(screen.getByTestId("comics")).toBeInTheDocument()
    })

    test("Should have Corousel Component in Dashboard",()=> {
        renderer(<Dashboard/>,element)
        const count=element.getElementsByTagName("Carousel")
        expect(count).toBeTruthy();
    })

    test("Should have Snackbar component in Dashboard",()=> {
        renderer(<Dashboard/>,element)
        const count=element.getElementsByTagName("Snackbar")
        expect(count).toBeTruthy();
    })
    
})