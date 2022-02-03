import React from 'react';
import { render, screen } from '@testing-library/react';
import {AppFastTaxiDriver} from './App';

test('renders learn react link', () => {
  render(<AppFastTaxiDriver />);
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
});
