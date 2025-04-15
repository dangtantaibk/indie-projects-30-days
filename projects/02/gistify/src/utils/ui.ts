import ora, { Ora } from 'ora';

/**
 * Creates and starts a loading spinner with the given text
 * @param text Text to display next to the spinner
 * @returns The spinner instance
 */
export function startSpinner(text: string): Ora {
    return ora({
        text,
        color: 'cyan',
        spinner: 'dots'
    }).start();
}

/**
 * Wraps an async operation with a loading spinner
 * @param operation The async operation to perform
 * @param loadingText Text to show while loading
 * @param successText Optional text to show on success
 * @returns The result of the operation
 */
export async function withSpinner<T>(
    operation: () => Promise<T>,
    loadingText: string,
    successText?: string
): Promise<T> {
    const spinner = startSpinner(loadingText);
    try {
        const result = await operation();
        spinner.succeed(successText);
        return result;
    } catch (error) {
        spinner.fail();
        throw error;
    }
}