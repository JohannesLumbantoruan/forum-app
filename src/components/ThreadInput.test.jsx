/**
 * test scenario for ThreadInput
 *
 * - ThreadInput Component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call addThread function when Add Thread button clicked
 */

import { describe, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

describe('ThreadInput Component', () => {
    it('should handle title typing correctly', async () => {
        // arrange
        render(<ThreadInput addThread={() => {}} />);
        const titleInput = screen.getByPlaceholderText('Title');

        // action
        await userEvent.type(titleInput, 'React');

        // assert
        expect(titleInput).toHaveValue('React');
    });

    it('should handle category typing correctly', async () => {
        // arrange
        render(<ThreadInput addThread={() => {}} />);
        const categoryInput = screen.getByPlaceholderText('Category');

        // action
        await userEvent.type(categoryInput, 'react');

        // assert
        expect(categoryInput).toHaveValue('react');
    });

    it('should handle body typing correctly', async () => {
        // arrange
        render(<ThreadInput addThread={() => {}} />);
        const bodyInput = screen.getByPlaceholderText('Body');

        // action
        await userEvent.type(bodyInput, 'React adalah framework UI terbaik!');

        // assert
        expect(bodyInput).toHaveValue('React adalah framework UI terbaik!');
    });

    it('should call addThread function when Add Thread button clicked', async () => {
        // arrange
        const mockAddThread = vi.fn();
        render(<ThreadInput addThread={mockAddThread} />);

        // fill title
        const titleInput = screen.getByPlaceholderText('Title');
        await userEvent.type(titleInput, 'React');

        // fill category
        const categoryInput = screen.getByPlaceholderText('Category');
        await userEvent.type(categoryInput, 'react');

        // fill body
        const bodyInput = screen.getByPlaceholderText('Body');
        await userEvent.type(bodyInput, 'React adalah framework UI terbaik!');

        const addThreadButton = screen.getByRole('button', { name: 'Add Thread' });

        // action
        await userEvent.click(addThreadButton);

        // assert
        expect(mockAddThread).toBeCalledWith({
            title: 'React',
            category: 'react',
            body: 'React adalah framework UI terbaik!'
        });
    });
});