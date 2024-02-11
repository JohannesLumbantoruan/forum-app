/**
 * test scenario for CommentInput
 *
 * - CommentInput component
 *  - should handle comment typing correctly
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import CommentInput from './CommentInput';
import store from '../states';

describe('CommentInput component', () => {
    it('should handle comment typing correctly', async () => {
        // arrange
        render(<CommentInput id="thread-12345" />, {
            wrapper: ({ children }) => (
                <Provider store={store}>{children}</Provider>
            )
        });
        const commentInput = screen.getByPlaceholderText('Type your comment');

        // action
        await userEvent.type(commentInput, 'This is a comment!');

        // assert
        expect(commentInput).toHaveValue('This is a comment!');
    });
});