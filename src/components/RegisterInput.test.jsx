/**
 * test scenario for RegisterInput
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call register function when register button clicked
 */

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
    describe, expect, it, vi
} from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
    it('should handle name typing correctly', async () => {
        // arrange
        render(<RegisterInput register={() => {}} />, { wrapper: BrowserRouter });
        const nameInput = screen.getByPlaceholderText('Name');

        // action
        await userEvent.type(nameInput, 'John Doe');

        // assert
        expect(nameInput).toHaveValue('John Doe');
    });

    it('should handle email typing correctly', async () => {
        // arrange
        render(<RegisterInput register={() => {}} />, { wrapper: BrowserRouter });
        const emailInput = screen.getByPlaceholderText('Email');

        // action
        await userEvent.type(emailInput, 'johndoe@mail.com');

        // assert
        expect(emailInput).toHaveValue('johndoe@mail.com');
    });

    it('should handle password typing correctly', async () => {
        // arrange
        render(<RegisterInput register={() => {}} />, { wrapper: BrowserRouter });
        const passwordInput = screen.getByPlaceholderText('Password');

        // action
        await userEvent.type(passwordInput, 'mypassword');

        // assert
        expect(passwordInput).toHaveValue('mypassword');
    });

    it('should call register function when register button clicked', async () => {
        // arrange
        const mockRegister = vi.fn();
        render(<RegisterInput register={mockRegister} />, { wrapper: BrowserRouter });

        const nameInput = screen.getByPlaceholderText('Name');
        await userEvent.type(nameInput, 'John Doe');

        const emailInput = screen.getByPlaceholderText('Email');
        await userEvent.type(emailInput, 'johndoe@mail.com');

        const passwordInput = screen.getByPlaceholderText('Password');
        await userEvent.type(passwordInput, 'mypassword');

        const registerButton = screen.getByRole('button', { name: 'Register' });

        // action
        await userEvent.click(registerButton);

        // assert
        expect(mockRegister).toBeCalledWith({
            name: 'John Doe',
            email: 'johndoe@mail.com',
            password: 'mypassword'
        });
    });
});