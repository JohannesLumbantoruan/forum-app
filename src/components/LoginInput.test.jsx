/**
 * test scenario for LoginInput
 *
 * - LoginInput Component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call login function when login button is clicked
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
    afterEach,
    beforeEach, describe, expect, it, vi
} from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle email typing correctly', async () => {
        // arrange
        render(<LoginInput login={() => {}} />, { wrapper: BrowserRouter });
        const emailInput = screen.getByPlaceholderText('Email');

        // action
        await userEvent.type(emailInput, 'johndoe@mail.com');

        // assert
        expect(emailInput).toHaveValue('johndoe@mail.com');
    });

    it('should handle password typing correctly', async () => {
        // arrange
        render(<LoginInput login={() => {}} />, { wrapper: BrowserRouter });
        const passwordInput = screen.getByPlaceholderText('Password');

        // action
        await userEvent.type(passwordInput, 'mypassword');

        // assert
        expect(passwordInput).toHaveValue('mypassword');
    });

    it('should call login function when login button is clicked', async () => {
        // arrange
        const mockLogin = vi.fn();
        render(<LoginInput login={mockLogin} />, { wrapper: BrowserRouter });

        const emailInput = screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'johndoe@mail.com');

        const passwordInput = screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'mypassword');

        const loginButton = screen.getByRole('button', { name: 'Login' });

        // action
        await userEvent.click(loginButton);

        // assert
        expect(mockLogin).toBeCalledWith({
            email: 'johndoe@mail.com',
            password: 'mypassword'
        });
    });
});