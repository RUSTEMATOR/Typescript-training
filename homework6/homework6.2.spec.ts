import { handleAction } from './homework6.2';
import { CreateUser, UpdateUser, DeleteUser, BlockUser } from './homework6.2';

describe('handleAction', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    test('should handle CREATE_USER with valid parameters', () => {
        const action: CreateUser = { type: 'CREATE_USER', payload: { name: 'John Doe', age: 30 } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('CREATE_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Creating user with name: John Doe and age: 30');
    });

    test('should handle CREATE_USER with missing parameters', () => {
        const action: CreateUser = { type: 'CREATE_USER', payload: { name: '', age: 0 } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('CREATE_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Missing parameters, name and age must be provided');
    });

    test('should handle UPDATE_USER with valid parameters', () => {
        const action: UpdateUser = { type: 'UPDATE_USER', payload: { userId: 1, name: 'Jane Doe', age: 25 } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('UPDATE_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Updating user with id: 1');
        expect(consoleSpy).toHaveBeenCalledWith('New name: Jane Doe');
        expect(consoleSpy).toHaveBeenCalledWith('New age: 25');
        expect(consoleSpy).toHaveBeenCalledWith('New name and age: Jane Doe and 25');
    });

    test('should handle UPDATE_USER with no changes', () => {
        const action: UpdateUser = { type: 'UPDATE_USER', payload: { userId: 1 } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('UPDATE_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Updating user with id: 1');
        expect(consoleSpy).toHaveBeenCalledWith('No changes made, no parameters have been provided');
    });

    test('should handle DELETE_USER with valid parameters', () => {
        const action: DeleteUser = { type: 'DELETE_USER', payload: { userId: 1 } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('DELETE_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Deleting user with id: 1');
    });

    test('should handle DELETE_USER with missing parameters', () => {
        const action: DeleteUser = { type: 'DELETE_USER', payload: { userId: 0 } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('DELETE_USER');
        expect(consoleSpy).toHaveBeenCalledWith('No parameters have been provided');
    });

    test('should handle BLOCK_USER with valid parameters', () => {
        const action: BlockUser = { type: 'BLOCK_USER', payload: { userId: 2, reason: 'Violation of terms' } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('BLOCK_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Blocking user with id: 2 for reason: Violation of terms');
    });

    test('should handle BLOCK_USER with missing parameters', () => {
        const action: BlockUser = { type: 'BLOCK_USER', payload: { userId: 0, reason: '' } };
        handleAction(action);
        expect(consoleSpy).toHaveBeenCalledWith('BLOCK_USER');
        expect(consoleSpy).toHaveBeenCalledWith('Missing parameters, userId and reason must be provided');
    });

    test('should throw an error for unknown action type', () => {
        const action = { type: 'UNKNOWN_ACTION', payload: {} } as any;
        expect(() => handleAction(action)).toThrow('Unhandled action type: [object Object]');
    });
});