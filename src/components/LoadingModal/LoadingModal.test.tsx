import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingModal from './LoadingModal';

describe('Loading', () => {
    it('renders correctly when called', () => {
        render(<LoadingModal />);

        const content = 'Loading';
        // Ensure that the modal content is rendered
        expect(screen.getByText(content)).toBeInTheDocument();

    });
})

