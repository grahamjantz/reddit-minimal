import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Search from './Search'


describe('search', () => {
    it('renders search component', () => {
        render(
            <Search />
        )
    })

    it('renders search with input field', () => {
        render(
            <Search />
        )

        const input = screen.getByPlaceholderText('Search')

        expect(input).toBeInTheDocument();
    })
    // it('searched for the inputted text', () => {
    //     const user = userEvent.setup();
    // })
})