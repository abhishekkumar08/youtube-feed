import React from 'react';
import { describe, it, expect } from 'vitest';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const countCards = () => document.querySelectorAll('.video-card').length;

const T = { timeout: 3000 };

describe('YouTube feed', () => {
  it('shows a skeleton loader first, then the feed', async () => {
    render(<App />);
    expect(screen.getByLabelText('Loading videos')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByLabelText('Loading videos'), T);
    expect((await screen.findAllByText('RakaZone Gaming', {}, T)).length).toBeGreaterThan(0);
  });

  it('filters videos by channel name via debounced search', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByLabelText('Loading videos'), T);

    // RakaZone Gaming is in the initial feed; search for "chef" must filter it out (after debounce).
    expect(screen.getAllByText('RakaZone Gaming').length).toBeGreaterThan(0);
    await user.type(screen.getByPlaceholderText('Search'), 'chef');

    await waitForElementToBeRemoved(() => screen.queryAllByText('RakaZone Gaming'), T);
    expect(screen.getAllByText('Chef Caleb').length).toBeGreaterThan(0);
  });

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByLabelText('Loading videos'), T);

    await user.type(screen.getByPlaceholderText('Search'), 'zzznotarealvideo');

    expect(await screen.findByText('No results found', {}, T)).toBeInTheDocument();
  });

  it('opens the details modal when a card is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByLabelText('Loading videos'), T);

    const card = (await screen.findAllByText('The Effects Of Overusing Every Supplement Explained', {}, T))[0];
    await user.click(card);

    expect(await screen.findByRole('dialog', {}, T)).toBeInTheDocument();
  });

  it('loads more videos when the scroll sentinel intersects (infinite scroll)', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByLabelText('Loading videos'), T);

    const before = countCards();
    expect(before).toBe(12); // PAGE_SIZE

    // Simulate the sentinel scrolling into view.
    const io = window.IntersectionObserver.instances.at(-1);
    act(() => io.trigger(true));

    await waitFor(() => expect(countCards()).toBeGreaterThan(before), T);
    expect(countCards()).toBe(24);
  });
});
