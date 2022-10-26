import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'
import redditLogo from '../../images/reddit-logo.png'

describe('header', () => {
    
    it('renders RedditMinimal title text', () => {
        render(
            <Header />
        )
        
        const image = screen.getByRole('img', {
            src: {redditLogo}
        })
        const h1 = screen.getByText('RedditMinimal')

        expect(image).toBeInTheDocument()    
        expect(h1).toBeInTheDocument();
    })
})