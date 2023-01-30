import { describe, it, expect } from 'vitest';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';

vi.mock('./contexts/ThemeContext', async () => {
  const actual = await vi.importActual('./contexts/ThemeContext');
  return {
    ...actual,
    ThemeContext: {
      Provider: ({ children }) => children
    },
    ThemeContextProvider: ({ children }) => children
  };
});

describe('App', () => {
  it('renders the Navbar component', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders the main content based on the route', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();
  });

  it('renders the Sidebar component', () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('toggles the sidebar when the sidebar toggle icon is clicked', () => {
    const { getByLabelText } = render(<App />, { wrapper: BrowserRouter });

    const toggleIcon = getByLabelText('Toggle Sidebar');

    expect(toggleIcon).toHaveClass('sidebar_toggle ');
    expect(toggleIcon).not.toHaveClass('active');

    fireEvent.click(toggleIcon);

    expect(toggleIcon).toHaveClass('sidebar_toggle active');

    fireEvent.click(toggleIcon);

    expect(toggleIcon).toHaveClass('sidebar_toggle ');
    expect(toggleIcon).not.toHaveClass('active');
  });
});
